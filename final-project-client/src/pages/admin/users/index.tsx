import {
  Box,
  Button,
  Container,
  Flex,
  IconButton,
  Input,
  SkeletonText,
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

export const AdminUsers = () => {
  const {
    users,
    isLoading,
    count,
    searchInputRef,
    clearSearch,
    handleSubmit,
    handleDeleteUserClick,
  } = useFunctions();

  return (
    <Container as="main" paddingY={8} maxWidth={1024}>
      <Box mb={4}>
        <Flex
          flexDirection={["column", "column", "row"]}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box as="h2" fontSize="3xl" fontWeight="bold">
            ผู้ใช้งานทั้งหมด
          </Box>
          <SkeletonText noOfLines={1} isLoaded={!isLoading}>
            แสดง {users.length} รายการ จากทั้งหมด {count} รายการ
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
          <Button as={Link} to="/admin/users/new" variant="outline">
            เพิ่มผู้ใช้
          </Button>
        </Flex>
      </Box>
      <TableContainer mb={4}>
        <Table>
          <Thead>
            <Tr>
              <Th>แก้ไข/ลบ</Th>
              <Th>ชื่อผู้ใช้ (Username)</Th>
              <Th>ชื่อจริง</Th>
              <Th>ตำแหน่ง</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.username}>
                <Td>
                  <Flex gap={2}>
                    <IconButton
                      as={Link}
                      to={`/admin/users/${user.id}/edit`}
                      aria-label="edit"
                      icon={<Icon icon="lucide:pen" />}
                      variant="ghost"
                      size="sm"
                    />
                    <IconButton
                      onClick={() => handleDeleteUserClick(user.id)}
                      aria-label="delete"
                      icon={<Icon icon="lucide:trash" />}
                      variant="ghost"
                      size="sm"
                    />
                  </Flex>
                </Td>
                <Td>{user.username}</Td>
                <Td>{user.fullname}</Td>
                <Td>{user.role.name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination count={count} />
    </Container>
  );
};
