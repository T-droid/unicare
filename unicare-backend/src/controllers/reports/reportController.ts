import { Request, Response } from "express";
import { dashboardData } from "../../services/reportService";
// import { fetchPrescriptionsReport, fetchLabTestsReport } from "../../services/reportService";

// export const getDrugUsageReport = async (
//     req: Request & { user?: { role: string; id: string | null } },
//     res: Response
// ) => {
//   const { role, id } = req.user || {};
//   if (!role && role !== "admin") {
//     return res.status(403).json({ message: "Unauthorized access" });
//   }
//   try {
//     const { startDate, endDate } = req.query;
//     const getDrugUsageReport = await fetchPrescriptionsReport(
//       new Date(startDate as string),
//       new Date(endDate as string)
//     );

//     if (getDrugUsageReport.length === 0) {
//       return res.status(207).json({ message: "No drug usage found for this period" });
//     }

//     return res.status(200).json({ message: "Drug usage report", data: getDrugUsageReport });
    
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: `${error}` });
    
//   }
// };

// export const getLabTestsReport = async (
//     req: Request & { user?: { role: string; id: string | null } },
//     res: Response
// ) => {
//   const { role, id } = req.user || {};
//   if (!role && role !== "admin") {
//     return res.status(403).json({ message: "Unauthorized access" });
//   }
//   try {
//     const { startDate, endDate } = req.query;
//     const getLabTestsReport = await fetchLabTestsReport(
//       startDate as string,
//       endDate as string
//     );

//     if (getLabTestsReport.length === 0) {
//       return res.status(207).json({ message: "No lab tests found for this period" });
//     }
//     return res.status(200).json({
//         lab_test_report: getLabTestsReport[0]
//     });

//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: `${error}` });

//   }
// };

// export const getStudentTreatedReport = (
//     req: Request & { user?: { role: string; id: string | null } },
//     res: Response
// ) => {
//   const { role, id } = req.user || {};
//   if (!role && role !== "admin") {
//     return res.status(403).json({ message: "Unauthorized access" });
//   }
// };

// export const getRoomOccupancyReport = async (
//     req: Request & { user?: { role: string; id: string | null } },
//     res: Response
// ) => {
//   const { role, id } = req.user || {};
//   if (!role && role !== "admin") {
//     return res.status(403).json({ message: "Unauthorized access" });
//   }

//   try {
//     const { startDate, endDate } = req.query;
//     const getRoomOccupancyReport = await fetchLabTestsReport(
//       startDate as string,
//       endDate as string
//     );
//     if (getRoomOccupancyReport.length === 0) {
//       return res.status(207).json({ message: "No room occupancy found for this period" });
//     }
//     return res.status(200).json({
//         room_occupancy_report: getRoomOccupancyReport[0]
//     });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: `${error}` });
    
//   }
// };

export const getReports = async(req: Request, res: Response) => {
    try {
      const { startDate, endDate } = req.query;
      const data = await dashboardData();
      return res.status(200).json({
        data,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `${error}` });
    }
}
