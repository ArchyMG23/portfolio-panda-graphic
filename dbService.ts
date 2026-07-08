import { db } from "./firebase";
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  deleteDoc
} from "firebase/firestore";
import { Project, BlogPost, Testimonial, Appointment, AppSettings } from "./types";
import { INITIAL_PROJECTS, INITIAL_POSTS, INITIAL_TESTIMONIALS } from "./constants";

const PROJECTS_COLL = "projects";
const POSTS_COLL = "posts";
const TESTIMONIALS_COLL = "testimonials";
const APPOINTMENTS_COLL = "appointments";
const SETTINGS_COLL = "settings";
const SUBSCRIBERS_COLL = "subscribers";

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      tenantId: null,
      providerInfo: []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

function logFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      tenantId: null,
      providerInfo: []
    },
    operationType,
    path
  };
  console.warn('Firestore Non-Blocking Error: ', JSON.stringify(errInfo));
}

// Utility to fetch all projects
export async function getProjectsFromDb(): Promise<Project[]> {
  try {
    const querySnapshot = await getDocs(collection(db, PROJECTS_COLL));
    const list: Project[] = [];
    querySnapshot.forEach((doc) => {
      list.push(doc.data() as Project);
    });

    if (list.length === 0) {
      console.log("Seeding projects...");
      for (const p of INITIAL_PROJECTS) {
        await setDoc(doc(db, PROJECTS_COLL, p.id), p);
      }
      return INITIAL_PROJECTS;
    }
    return list;
  } catch (error) {
    logFirestoreError(error, OperationType.GET, PROJECTS_COLL);
    return INITIAL_PROJECTS;
  }
}

// Utility to add a project
export async function addProjectToDb(project: Project): Promise<void> {
  try {
    await setDoc(doc(db, PROJECTS_COLL, project.id), project);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${PROJECTS_COLL}/${project.id}`);
  }
}

// Utility to delete a project
export async function deleteProjectFromDb(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, PROJECTS_COLL, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${PROJECTS_COLL}/${id}`);
  }
}

// Utility to fetch all posts
export async function getBlogPostsFromDb(): Promise<BlogPost[]> {
  try {
    const querySnapshot = await getDocs(collection(db, POSTS_COLL));
    const list: BlogPost[] = [];
    querySnapshot.forEach((doc) => {
      list.push(doc.data() as BlogPost);
    });

    if (list.length === 0) {
      console.log("Seeding blog posts...");
      for (const p of INITIAL_POSTS) {
        await setDoc(doc(db, POSTS_COLL, p.id), p);
      }
      return INITIAL_POSTS;
    }
    return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    logFirestoreError(error, OperationType.GET, POSTS_COLL);
    return INITIAL_POSTS;
  }
}

// Utility to add a blog post
export async function addBlogPostToDb(post: BlogPost): Promise<void> {
  try {
    await setDoc(doc(db, POSTS_COLL, post.id), post);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${POSTS_COLL}/${post.id}`);
  }
}

// Utility to update a blog post
export async function updateBlogPostInDb(post: BlogPost): Promise<void> {
  try {
    await setDoc(doc(db, POSTS_COLL, post.id), post);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${POSTS_COLL}/${post.id}`);
  }
}

// Utility to delete a blog post
export async function deleteBlogPostFromDb(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, POSTS_COLL, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${POSTS_COLL}/${id}`);
  }
}

// Utility to fetch all testimonials
export async function getTestimonialsFromDb(): Promise<Testimonial[]> {
  try {
    const querySnapshot = await getDocs(collection(db, TESTIMONIALS_COLL));
    const list: Testimonial[] = [];
    querySnapshot.forEach((doc) => {
      list.push(doc.data() as Testimonial);
    });

    if (list.length === 0) {
      console.log("Seeding testimonials...");
      for (const t of INITIAL_TESTIMONIALS) {
        await setDoc(doc(db, TESTIMONIALS_COLL, t.id), t);
      }
      return INITIAL_TESTIMONIALS;
    }
    return list;
  } catch (error) {
    logFirestoreError(error, OperationType.GET, TESTIMONIALS_COLL);
    return INITIAL_TESTIMONIALS;
  }
}

// Utility to add a testimonial
export async function addTestimonialToDb(testimonial: Testimonial): Promise<void> {
  try {
    await setDoc(doc(db, TESTIMONIALS_COLL, testimonial.id), testimonial);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${TESTIMONIALS_COLL}/${testimonial.id}`);
  }
}

// Utility to delete a testimonial
export async function deleteTestimonialFromDb(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, TESTIMONIALS_COLL, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${TESTIMONIALS_COLL}/${id}`);
  }
}

// Utility to fetch all appointments
export async function getAppointmentsFromDb(): Promise<Appointment[]> {
  try {
    const querySnapshot = await getDocs(collection(db, APPOINTMENTS_COLL));
    const list: Appointment[] = [];
    querySnapshot.forEach((doc) => {
      list.push(doc.data() as Appointment);
    });
    return list;
  } catch (error) {
    logFirestoreError(error, OperationType.GET, APPOINTMENTS_COLL);
    return [];
  }
}

// Utility to add an appointment
export async function addAppointmentToDb(appointment: Appointment): Promise<void> {
  try {
    await setDoc(doc(db, APPOINTMENTS_COLL, appointment.id), appointment);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${APPOINTMENTS_COLL}/${appointment.id}`);
  }
}

// Utility to update an appointment
export async function updateAppointmentInDb(appointment: Appointment): Promise<void> {
  try {
    await setDoc(doc(db, APPOINTMENTS_COLL, appointment.id), appointment);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${APPOINTMENTS_COLL}/${appointment.id}`);
  }
}

// Utility to delete an appointment
export async function deleteAppointmentFromDb(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, APPOINTMENTS_COLL, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${APPOINTMENTS_COLL}/${id}`);
  }
}

// Utility to fetch settings
export async function getSettingsFromDb(): Promise<AppSettings> {
  const defaultSettings: AppSettings = {
    socialLinks: {
      facebook: 'https://facebook.com/panda_graphic',
      instagram: 'https://instagram.com/panda_graphic',
      whatsapp: '+237 654 491 319'
    },
    logoTagline: {
      fr: "L'excellence visuelle par Victor Gabriel Archange",
      en: "Visual Excellence by Victor Gabriel Archange",
      de: "Visuelle Exzellenz von Victor Gabriel Archange"
    }
  };

  try {
    const docRef = doc(db, SETTINGS_COLL, "global");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as AppSettings;
    } else {
      console.log("Seeding settings...");
      await setDoc(docRef, defaultSettings);
      return defaultSettings;
    }
  } catch (error) {
    logFirestoreError(error, OperationType.GET, `${SETTINGS_COLL}/global`);
    return defaultSettings;
  }
}

// Utility to update settings
export async function updateSettingsInDb(settings: AppSettings): Promise<void> {
  try {
    await setDoc(doc(db, SETTINGS_COLL, "global"), settings);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${SETTINGS_COLL}/global`);
  }
}

// Utility to add subscriber
export async function addSubscriberToDb(email: string): Promise<void> {
  const subDocId = email.replace(/[@.]/g, "_");
  try {
    await setDoc(doc(db, SUBSCRIBERS_COLL, subDocId), {
      email,
      subscribedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${SUBSCRIBERS_COLL}/${subDocId}`);
  }
}
