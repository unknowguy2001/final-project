import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Input,
  SkeletonText,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

import { useFunctions } from "./useFunctions";
import { Pagination } from "../../../components/pagination";

export const AdminCompanies = () => {
  const {
    companies,
    isLoading,
    count,
    searchInputRef,
    clearSearch,
    handleSubmit,
    handleDeleteCompanyClick,
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
        <Flex mt={2} gap={4}>
          <Box flex={1} as="form" onSubmit={handleSubmit} position="relative">
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
          <Button as={Link} to="/admin/companies/new" variant="outline">
            เพิ่มบริษัท
          </Button>
        </Flex>
      </Box>
      <TableContainer mb={4}>
        <Table>
          <Thead>
            <Tr>
              <Th>แก้ไข/ลบ</Th>
              <Th>ชื่อบริษัท</Th>
              <Th>ที่อยู่</Th>
              <Th>เบอร์โทรศัพท์</Th>
            </Tr>
          </Thead>
          <Tbody>
            {companies.map((company) => (
              <Tr key={company.id}>
                <Td>
                  <Flex gap={2}>
                    <IconButton
                      as={Link}
                      to={`/admin/companies/${company.id}/edit`}
                      aria-label="edit"
                      icon={<Icon icon="lucide:pen" />}
                      variant="ghost"
                      size="sm"
                    />
                    <IconButton
                      onClick={() => handleDeleteCompanyClick(company.id)}
                      aria-label="delete"
                      icon={<Icon icon="lucide:trash" />}
                      variant="ghost"
                      size="sm"
                    />
                  </Flex>
                </Td>
                <Td>{company.name}</Td>
                <Td>
                  {" "}
                  {company.address} {company.road} {company.village}{" "}
                  {company.district} {company.province} {company.zipcode}
                </Td>
                <Td>{company.telephone || "-"}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination count={count} />
    </Container>
  );
};
