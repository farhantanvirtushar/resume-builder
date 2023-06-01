import { Contact } from "./Contact";
import { Education } from "./Education";
import { Experience } from "./Experience";
import { Skill } from "./Skill";

export interface User {
  name: string;
  profession?: string;
  photo: string;
  summary: string;
  experiences: Experience[];
  educations: Education[];
  languages: Skill[];
  contact: Contact;
  awards: string[];
  publications: string[];
  skills: Skill[];
}
