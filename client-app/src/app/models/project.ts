export interface Project {
  projectId: string;
  projectName: string;
  projectDescription?: any;
  projectIsActive: boolean;
}

export class ProjectFormValues
{
  projectId: string = '';
  projectName: string = '';
  projectDescription?: any = '';
  projectIsActive: boolean = true;

  constructor(project?: ProjectFormValues) {
    if (project) {
      this.projectId = project.projectId;
      this.projectName = project.projectName;
      this.projectDescription = project.projectDescription;
      this.projectIsActive = project.projectIsActive;
    }
  }

}