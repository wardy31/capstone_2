import Dexie from "dexie";

export const db = new Dexie("earchive");

db.version(1).stores({
  researches: "id,research,researchId,userId,createdAt,file,image",
  sync_researches:
    "++id,title,abstract,file,status,month,year,paperType,createdAt,modifiedAt,departmentId,courseId,delete",
  users: "id,role,fullName,username,password,isValidate,departmentId,courseId",
  colleges: "id,name",
  departments: "id,name,collegeId",
  courses: "id,name,departmentId",
});
