import { useState, useEffect } from "react";
import { JobItem, JobItemExpanded } from "./types";
import { BASE_API_URL } from "./constants";

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      console.log("Hash changed:", window.location.hash.slice(1));
      const id = +window.location.hash.slice(1); // Convert to number with unary plus operator
      setActiveId(id);
    };

    handleHashChange(); // Call it once to handle the initial hash

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return activeId;
}

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const totalNumberOfResults = jobItems.length;
  const jobItemsSliced = jobItems.slice(0, 7);

  useEffect(() => {
    if (!searchText) return;

    const fetchData = async () => {
      setIsLoading(true);

      const response = await fetch(`${BASE_API_URL}?search=${searchText}`);

      const data = await response.json();
      console.log(data);
      setIsLoading(false);
      setJobItems(data.jobItems);
    };

    fetchData();
  }, [searchText]);

  return [jobItemsSliced, isLoading, totalNumberOfResults] as const;
}

export function useJobItem(id: number | null) {
  const [jobItem, setJobItem] = useState<JobItemExpanded | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    // Fetch the job item details based on the activeId

    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(BASE_API_URL + `/${id}`);

      const data = await response.json();
      setIsLoading(false);
      setJobItem(data.jobItem);
    };

    fetchData();
  }, [id]);

  return [jobItem, isLoading] as const;
}
