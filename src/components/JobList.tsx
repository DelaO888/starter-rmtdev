import JobListItem from "./JobListItem";
import Spinner from "./Spinner";
import { JobItem } from "../lib/types";
import { useActiveId } from "../lib/hooks";

type JobListProps = {
  jobItems: JobItem[];
  isLoading: boolean;
};

export function JobList({ jobItems, isLoading }: JobListProps) {
  const activeId = useActiveId();

  return (
    <ul className="job-list">
      {isLoading ? <Spinner /> : null}

      {!isLoading &&
        jobItems.map((jobItem) => (
          <JobListItem
            jobItem={jobItem}
            key={jobItem.id}
            isActive={jobItem.id === activeId}
          />
        ))}
    </ul>
  );
}

export default JobList;
