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
  IconButton,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Heading,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { Rating } from "@smastrom/react-rating";

import { useFunctions } from "./useFunctions";
import { Pagination } from "../../components/pagination";
import CompanyCard from "../../components/company-card";
import decreaseImage from "../../assets/images/decrease.png";

export const Companies = () => {
  const {
    companies,
    count,
    isLoading,
    searchInputRef,
    handleSubmit,
    clearSearch,
    isDisplayMode,
    setDisplayMode,
    handleCompanyRowClick,
  } = useFunctions();

  return (
    <Container as="main" paddingY={8} maxWidth={1024}>
      <Box mb={4}>
        <Flex
          flexDirection={["column", "column", "row"]}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading as="h2" fontSize="2xl">
            บริษัททั้งหมด
          </Heading>
          <SkeletonText noOfLines={1} isLoaded={!isLoading}>
            แสดง {companies.length} รายการ จากทั้งหมด {count} รายการ
          </SkeletonText>
        </Flex>
        <Flex gap={4} mt={2}>
          <Box flex={1} as="form" position="relative" onSubmit={handleSubmit}>
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
                <Icon icon="lucide:x" />
              </Box>
              <Box as="button" type="submit">
                <Icon icon="lucide:search" />
              </Box>
            </Box>
          </Box>
          <Box>
            <IconButton
              borderTopRightRadius={0}
              borderBottomRightRadius={0}
              variant={isDisplayMode("grid") ? "solid" : "outline"}
              onClick={() => setDisplayMode("grid")}
              aria-label=""
              icon={<Icon icon="lucide:layout-grid" />}
            />
            <IconButton
              borderTopLeftRadius={0}
              borderBottomLeftRadius={0}
              variant={isDisplayMode("list") ? "solid" : "outline"}
              onClick={() => setDisplayMode("list")}
              aria-label=""
              icon={<Icon icon="lucide:list" />}
            />
          </Box>
        </Flex>
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
      {isDisplayMode("grid") ? (
        <SimpleGrid columns={[1, 2, 3]} gap={4}>
          {isLoading ? (
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} borderRadius="md" height="400px" />
              ))}
            </>
          ) : (
            companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))
          )}
        </SimpleGrid>
      ) : (
        <>
          {!isLoading && companies.length && (
            <TableContainer
              border="1px solid"
              borderColor="brand.100"
              rounded="lg"
            >
              <Table>
                <Thead>
                  <Tr>
                    <Th minWidth={200}>รูป</Th>
                    <Th minWidth={175}>คะแนนรีวิว</Th>
                    <Th>ชื่อ</Th>
                    <Th>ที่อยู่</Th>
                    <Th>เบอร์โทรศัพท์</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {companies.map((company) => (
                    <Tr
                      onClick={() => handleCompanyRowClick(company.id)}
                      cursor="pointer"
                      _hover={{
                        backgroundColor: "brand.25",
                      }}
                      key={company.id}
                    >
                      <Td>
                        <Image
                          rounded="lg"
                          objectFit="cover"
                          src="https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        />
                      </Td>
                      <Td>
                        <Flex gap={1} alignItems="center">
                          <Box>
                            <Rating readOnly value={company?.averageRating} />
                          </Box>
                          <Text fontSize="xs">
                            ({company?.reviewCount} รีวิว)
                          </Text>
                        </Flex>
                      </Td>

                      <Td>{company.name}</Td>
                      <Td>
                        {[
                          company.address,
                          company.road,
                          company.village,
                          company.district,
                          company.province,
                          company.zipcode,
                        ].every((item) => !item) && "-"}
                        {company.address} {company.road} {company.village}{" "}
                        {company.district} {company.province} {company.zipcode}
                      </Td>
                      <Td>{company.telephone || "-"}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
      <Box mt={4}>
        <Pagination count={count} />
      </Box>
    </Container>
  );
};
