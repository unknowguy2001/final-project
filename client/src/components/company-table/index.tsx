import {
  Box,
  Flex,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Rating } from "@smastrom/react-rating";
import { useNavigate } from "react-router-dom";
import { Company } from "../../interfaces/company";

interface CompanyTableProps {
  companies: Company[];
}

export const CompanyTable = ({ companies }: CompanyTableProps) => {
  const navigate = useNavigate();

  const handleCompanyRowClick = (id: number) => {
    navigate(`/companies/${id}`);
  };

  return (
    <TableContainer
      border="1px solid"
      borderColor="brand.100"
      _dark={{
        borderColor: "gray.600",
      }}
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
              _dark={{
                _hover: {
                  backgroundColor: "gray.650",
                },
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
                  <Text fontSize="xs">({company?.reviewCount} รีวิว)</Text>
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
  );
};
