import {
  Box,
  Flex,
  Text,
  Input,
  Heading,
  Container,
  IconButton,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";

import useFunctions from "./useFunctions";
import { Pagination } from "../../components/pagination";
import { CompanyGrid } from "../../components/company-grid";
import { CompanyTable } from "../../components/company-table";
import { SearchNotFound } from "../../components/search-not-found";

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
  } = useFunctions();

  return (
    <Container as="main" paddingY={8} maxWidth="6xl">
      <Box mb={4}>
        <Flex
          flexDirection={["column", "column", "row"]}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading as="h2" fontSize="2xl">
            บริษัททั้งหมด
          </Heading>
          <Text>
            แสดง {companies.length} รายการ จากทั้งหมด {count} รายการ
          </Text>
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
      {!isLoading && companies.length === 0 && <SearchNotFound />}
      {isDisplayMode("grid") ? (
        <CompanyGrid companies={companies} isLoading={isLoading} />
      ) : (
        <CompanyTable companies={companies} isLoading={isLoading} />
      )}
      <Box mt={4}>
        <Pagination count={count} />
      </Box>
    </Container>
  );
};
