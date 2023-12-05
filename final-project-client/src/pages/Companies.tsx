import {
  Box,
  Flex,
  Text,
  Skeleton,
  Container,
  SimpleGrid,
  Input,
  Image,
  AspectRatio,
} from "@chakra-ui/react";
import { SyntheticEvent, useRef } from "react";
import { LuSearch, LuX } from "react-icons/lu";

import useCompanies from "../hooks/useCompanies";
import Pagination from "../components/Pagination";
import CompanyCard from "../components/CompanyCard";
import decreaseImage from "../assets/images/decrease.png";

const PER_PAGE = 12;

const Companies = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { companies, count, isLoading, setSearchTerm } = useCompanies();

  const totalPages = count / PER_PAGE;

  const handleClearSearch = () => {
    setSearchTerm("");
    searchInputRef.current!.value = "";
    searchInputRef.current!.focus();
  };

  const handleFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setSearchTerm(searchInputRef.current?.value || "");
  };

  return (
    <main>
      <Container as="section" paddingY={8} maxWidth={1024}>
        <Box mb={4}>
          <Flex justifyContent="space-between" alignItems="center">
            <Box as="h2" fontSize="3xl" fontWeight="bold">
              Companies
            </Box>
            <Text>
              Displaying {companies.length} item(s) of {count}
            </Text>
          </Flex>
          <Box as="form" position="relative" onSubmit={handleFormSubmit} mt={2}>
            <Input placeholder="Search" ref={searchInputRef} />
            <Box
              position="absolute"
              right={4}
              top="50%"
              zIndex={1}
              transform="translateY(-50%)"
              display="flex"
              gap={2}
            >
              <Box as="button" type="button" onClick={handleClearSearch}>
                <LuX />
              </Box>
              <Box as="button" type="submit" onClick={handleFormSubmit}>
                <LuSearch />
              </Box>
            </Box>
          </Box>
        </Box>
        {!isLoading && companies.length === 0 && (
          <Flex
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <AspectRatio width="100%" maxWidth="500px" ratio={16 / 9}>
              <Image width="100%" height="100%" src={decreaseImage} />
            </AspectRatio>
            <Text textAlign="center" fontWeight="bold">
              No companies found
            </Text>
          </Flex>
        )}
        <SimpleGrid columns={[1, 2, 3]} gap={4} mb={4}>
          {isLoading && (
            <>
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} borderRadius="md" height="400px" />
              ))}
            </>
          )}
          {companies?.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </SimpleGrid>
        {totalPages > 1 && <Pagination totalPages={totalPages} />}
      </Container>
    </main>
  );
};
export default Companies;
