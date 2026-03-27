import React, { createContext, useContext, useState, useCallback } from "react";
import { Complaint, CaseStatus, initialComplaints, generateAIInsights } from "@/data/mockData";

interface ComplaintContextType {
  complaints: Complaint[];
  addComplaint: (c: Omit<Complaint, "aiInsights">) => void;
  updateStatus: (id: string, status: CaseStatus) => void;
  assignDept: (id: string, dept: string) => void;
  assignOfficer: (id: string, officer: string) => void;
  markRead: (id: string) => void;
  rateComplaint: (id: string, rating: number) => void;
  acceptAIRecommendation: (id: string) => void;
}

const ComplaintContext = createContext<ComplaintContextType | undefined>(undefined);

export const ComplaintProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);

  const addComplaint = useCallback((c: Omit<Complaint, "aiInsights">) => {
    setComplaints((prev) => {
      const ai = generateAIInsights(c, prev as Complaint[]);
      return [{ ...c, aiInsights: ai }, ...prev];
    });
  }, []);

  const updateStatus = useCallback((id: string, status: CaseStatus) => {
    setComplaints((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  }, []);

  const assignDept = useCallback((id: string, dept: string) => {
    setComplaints((prev) => prev.map((c) => (c.id === id ? { ...c, assignedDept: dept } : c)));
  }, []);

  const assignOfficer = useCallback((id: string, officer: string) => {
    setComplaints((prev) => prev.map((c) => (c.id === id ? { ...c, assignedOfficer: officer } : c)));
  }, []);

  const markRead = useCallback((id: string) => {
    setComplaints((prev) => prev.map((c) => (c.id === id ? { ...c, isRead: true } : c)));
  }, []);

  const rateComplaint = useCallback((id: string, rating: number) => {
    setComplaints((prev) => prev.map((c) => (c.id === id ? { ...c, citizenRating: rating } : c)));
  }, []);

  const acceptAIRecommendation = useCallback((id: string) => {
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        return {
          ...c,
          priority: c.aiInsights.prioritySuggestion,
          status: c.aiInsights.emergencyRisk ? "In Progress" : c.status,
        };
      })
    );
  }, []);

  return (
    <ComplaintContext.Provider
      value={{ complaints, addComplaint, updateStatus, assignDept, assignOfficer, markRead, rateComplaint, acceptAIRecommendation }}
    >
      {children}
    </ComplaintContext.Provider>
  );
};

export const useComplaints = () => {
  const ctx = useContext(ComplaintContext);
  if (!ctx) throw new Error("useComplaints must be used within ComplaintProvider");
  return ctx;
};
