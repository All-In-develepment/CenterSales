export interface ProjectWeight {
  projectWeightId: string;
  projectId: string;
  projectName?: string;
  month: string;
  salesValueWeight: number;
  conversionWeight: number;
  registrationWeight: number;
  depositWeight: number;
}

export class ProjectWeightFormValues {
  projectWeightId: string = "";
  projectId: string = "";
  month: string = "";
  salesValueWeight: number = 0;
  conversionWeight: number = 0;
  registrationWeight: number = 0;
  depositWeight: number = 0;

  constructor(init?: ProjectWeightFormValues) {
    if (init && init.projectId) {
      this.projectWeightId = init.projectWeightId;
      this.projectId = init.projectId;
      this.month = init.month;
      this.salesValueWeight = init.salesValueWeight;
      this.conversionWeight = init.conversionWeight;
      this.registrationWeight = init.registrationWeight;
      this.depositWeight = init.depositWeight;
    }
  }
}
