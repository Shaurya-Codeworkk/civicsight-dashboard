import React, { createContext, useContext, useState, useCallback } from "react";
import { EncroachmentCase, CaseStatus, initialCases } from "@/data/mockData";

interface CivicContextType {
  cases: EncroachmentCase[];
  addCase: (c: EncroachmentCase) => void;
  updateCaseStatus: (id: string, status: CaseStatus) => void;
  assignOfficer: (id: string, officer: string) => void;
  getCase: (id: string) => EncroachmentCase | undefined;
}

const CivicContext = createContext<CivicContextType | undefined>(undefined);

export const CivicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cases, setCases] = useState<EncroachmentCase[]>(initialCases);

  const addCase = useCallback((c: EncroachmentCase) => {
    setCases((prev) => [c, ...prev]);
  }, []);

  const updateCaseStatus = useCallback((id: string, status: CaseStatus) => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status,
              timeline: [
                ...c.timeline,
                {
                  date: new Date().toISOString().split("T")[0],
                  label: status === "Cleared" ? "Encroachment Cleared" : `Status → ${status}`,
                  description: `Case status updated to ${status}`,
                },
              ],
            }
          : c
      )
    );
  }, []);

  const assignOfficer = useCallback((id: string, officer: string) => {
    setCases((prev) => prev.map((c) => (c.id === id ? { ...c, assignedOfficer: officer } : c)));
  }, []);

  const getCase = useCallback((id: string) => cases.find((c) => c.id === id), [cases]);

  return (
    <CivicContext.Provider value={{ cases, addCase, updateCaseStatus, assignOfficer, getCase }}>
      {children}
    </CivicContext.Provider>
  );
};

export const useCivic = () => {
  const ctx = useContext(CivicContext);
  if (!ctx) throw new Error("useCivic must be used within CivicProvider");
  return ctx;
};
