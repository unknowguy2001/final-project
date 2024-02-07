import { SimpleGrid } from "@chakra-ui/react";
import { Company } from "../../interfaces/company";
import CompanyCard from "../company-card";

interface CompanyGridProps {
  companies: Company[];
}

export const CompanyGrid = ({ companies }: CompanyGridProps) => {
  return (
    <SimpleGrid columns={[1, 2, 3]} gap={4}>
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </SimpleGrid>
  );
};
