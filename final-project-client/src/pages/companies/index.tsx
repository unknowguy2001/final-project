import {
  Box,
  Flex,
  Text,
  Input,
  Image,
  Skeleton,
  Container,
  SimpleGrid,
  AspectRatio,
  SkeletonText,
} from "@chakra-ui/react";
import { LuSearch, LuX } from "react-icons/lu";

import { useFunctions } from "./useFunctions";
import Pagination from "../../components/Pagination";
import CompanyCard from "../../components/CompanyCard";
import decreaseImage from "../../assets/images/decrease.png";

export const Companies = () => {
  const {
    companies,
    count,
    isLoading,
    searchInputRef,
    handleSubmit,
    clearSearch,
  } = useFunctions();

  return (
    <main>
      <Container as="section" paddingY={8} maxWidth={1024}>
        <Box mb={4}>
          <Flex justifyContent="space-between" alignItems="center">
            <Box as="h2" fontSize="3xl" fontWeight="bold">
              บริษัททั้งหมด
            </Box>
            <SkeletonText noOfLines={1} isLoaded={!isLoading}>
              แสดง {companies.length} รายการ จากทั้งหมด {count} รายการ
            </SkeletonText>
          </Flex>
          <Box as="form" position="relative" onSubmit={handleSubmit} mt={2}>
            <Input placeholder="ค้นหา" ref={searchInputRef} />
            <Box
              position="absolute"
              right={4}
              top="50%"
              zIndex={1}
              transform="translateY(-50%)"
              display="flex"
              gap={2}
            >
              <Box as="button" type="button" onClick={clearSearch}>
                <LuX />
              </Box>
              <Box as="button" type="submit">
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
              ไม่พบข้อมูลที่ค้นหา
            </Text>
          </Flex>
        )}
        <SimpleGrid columns={[1, 2, 3]} gap={4} mb={4}>
          {isLoading ? (
            <>
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} borderRadius="md" height="400px" />
              ))}
            </>
          ) : (
            companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))
          )}
        </SimpleGrid>
        <Pagination count={count} />
      </Container>
    </main>
  );
};
