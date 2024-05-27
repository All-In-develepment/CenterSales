export interface SalePerformanceTeam {
  sptId: number
  sptDate: string
  sptTotalLeads: number
  sptTotalSales: number
  sptTotalSalesAmont: number
  sptavgSales: number
  sptavgSalesAmont: number
  sptTotalRegister: number
  sptTotalRegisterAmont: number
  sptavgRegister: number
  sptavgRegisterAmont: number
  sptTotalRedeposit: number
  sptTotalRedepositAmont: number
  sptavgRedeposit: number
  sptavgRedepositAmont: number
  sptavgConvertion: number
  sptBookmakerId: string
  sptBookmakerName: string
  sptSellerId: string
  sptSellerName: string
  sptProjectId: string
  sptProjectName: string
  sptEventId: string
  sptEventName: string
  sptCreatedAt: string
  sptUpdatedAt: string
}

export class SalePerformanceTeamFormValues
{
  sptId: number = 0
  sptDate: string = ''
  sptTotalLeads: number = 0
  sptTotalSales: number = 0
  sptTotalSalesAmont: number = 0
  sptavgSales: number = 0
  sptavgSalesAmont: number = 0
  sptTotalRegister: number = 0
  sptTotalRegisterAmont: number = 0
  sptavgRegister: number = 0
  sptavgRegisterAmont: number = 0
  sptTotalRedeposit: number = 0
  sptTotalRedepositAmont: number = 0
  sptavgRedeposit: number = 0
  sptavgRedepositAmont: number = 0
  sptavgConvertion: number = 0
  sptBookmakerId: string = ''
  sptBookmakerName: string = ''
  sptSellerId: string = ''
  sptSellerName: string = ''
  sptProjectId: string = ''
  sptProjectName: string = ''
  sptEventId: string = ''
  sptEventName: string = ''
  sptCreatedAt: string = ''
  sptUpdatedAt: string = ''

  constructor(salePerformanceTeam?: SalePerformanceTeamFormValues) {
    if (salePerformanceTeam) {
      this.sptId = salePerformanceTeam.sptId,
      this.sptDate = salePerformanceTeam.sptDate,
      this.sptTotalLeads = salePerformanceTeam.sptTotalLeads,
      this.sptTotalSales = salePerformanceTeam.sptTotalSales,
      this.sptTotalSalesAmont = salePerformanceTeam.sptTotalSalesAmont,
      this.sptavgSales = salePerformanceTeam.sptavgSales,
      this.sptavgSalesAmont = salePerformanceTeam.sptavgSalesAmont,
      this.sptTotalRegister = salePerformanceTeam.sptTotalRegister,
      this.sptTotalRegisterAmont = salePerformanceTeam.sptTotalRegisterAmont,
      this.sptavgRegister = salePerformanceTeam.sptavgRegister,
      this.sptavgRegisterAmont = salePerformanceTeam.sptavgRegisterAmont,
      this.sptTotalRedeposit = salePerformanceTeam.sptTotalRedeposit,
      this.sptTotalRedepositAmont = salePerformanceTeam.sptTotalRedepositAmont,
      this.sptavgRedeposit = salePerformanceTeam.sptavgRedeposit,
      this.sptavgRedepositAmont = salePerformanceTeam.sptavgRedepositAmont,
      this.sptavgConvertion = salePerformanceTeam.sptavgConvertion,
      this.sptBookmakerId = salePerformanceTeam.sptBookmakerId,
      this.sptBookmakerName = salePerformanceTeam.sptBookmakerName,
      this.sptSellerId = salePerformanceTeam.sptSellerId,
      this.sptSellerName = salePerformanceTeam.sptSellerName,
      this.sptProjectId = salePerformanceTeam.sptProjectId,
      this.sptProjectName = salePerformanceTeam.sptProjectName,
      this.sptEventId = salePerformanceTeam.sptEventId,
      this.sptEventName = salePerformanceTeam.sptEventName,
      this.sptCreatedAt = salePerformanceTeam.sptCreatedAt,
      this.sptUpdatedAt = salePerformanceTeam.sptUpdatedAt
    }
  }
}
