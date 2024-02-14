import { SimpleGrid, Skeleton } from "@chakra-ui/react";

import CompanyCard from "../company-card";
import { Company } from "../../interfaces/company";

interface CompanyGridProps {
  companies: Company[];
  isLoading: boolean;
}

export const CompanyGrid = ({ companies, isLoading }: CompanyGridProps) => {
  return (
    <SimpleGrid columns={[1, 2, 3]} gap={4}>
      {isLoading
        ? Array.from({ length: 12 }).map((_, index) => (
            <Skeleton key={index} borderRadius="md" height="398px" />
          ))
        : companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
    </SimpleGrid>
  );
};
