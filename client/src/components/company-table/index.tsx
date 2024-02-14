import {
  Box,
  Flex,
  Image,
  Skeleton,
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
  isLoading: boolean;
}

export const CompanyTable = ({ companies, isLoading }: CompanyTableProps) => {
  const navigate = useNavigate();

  const handleCompanyRowClick = (id: number) => {
    navigate(`/companies/${id}`);
  };

  if (!isLoading && companies.length === 0) return null;

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
            <Th>รูป</Th>
            <Th>คะแนนรีวิว</Th>
            <Th>ชื่อ</Th>
            <Th>ที่อยู่</Th>
            <Th>เบอร์โทรศัพท์</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading
            ? Array.from({ length: 12 }).map((_, index) => (
                <Tr key={index}>
                  <Td>
                    <Skeleton rounded="lg" aspectRatio={16 / 9} width={40} />
                  </Td>
                  <Td>
                    <Skeleton height={4} width="150px" />
                  </Td>
                  <Td>
                    <Skeleton height={4} width={80} />
                  </Td>
                  <Td>
                    <Skeleton height={4} width={80} />
                  </Td>
                  <Td>
                    <Skeleton height={4} width={100} />
                  </Td>
                </Tr>
              ))
            : companies.map((company) => (
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
                      aspectRatio={16 / 9}
                      minWidth={40}
                      objectFit="cover"
                      src="company.jpg"
                    />
                  </Td>
                  <Td>
                    <Flex minWidth="150px" gap={1} alignItems="center">
                      <Box>
                        <Rating readOnly value={company?.averageRating} />
                      </Box>
                      <Text
                        color="brand.500"
                        _dark={{
                          color: "brand.300",
                        }}
                        fontWeight={500}
                        fontSize="xs"
                      >
                        {company?.averageRating}/5
                      </Text>
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
