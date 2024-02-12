import { Link } from "react-router-dom";
import { ResponsivePie } from "@nivo/pie";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Flex,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getHashtags, getRoles } from "../../services/chartService";

export const Admin = () => {
  const [roles, setRoles] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    const loadHashtags = async () => {
      const res = await getHashtags({
        signal: abortController.signal,
      });
      setData(res.data as []);
    };

    loadHashtags();

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    const loadRoles = async () => {
      const res = await getRoles({
        signal: abortController.signal,
      });
      setRoles(res.data as []);
    };

    loadRoles();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <Container as="main" paddingY={8} maxWidth={1024}>
        <Heading as="h1" fontSize="3xl">
          หน้าแอดมิน
        </Heading>
        <Flex alignItems="center" gap={4} mt={4}>
          <Button variant="outline" to="/admin/users" as={Link}>
            จัดการผู้ใช้
          </Button>
          <Button variant="outline" to="/admin/companies" as={Link}>
            จัดการบริษัท
          </Button>
        </Flex>
        <Stack mt={4} gap={4}>
          <Card variant="outline">
            <CardHeader borderBottom="1px solid" borderBottomColor="gray.200">
              <Heading as="h2" fontSize="xl">
                แผนภูมิแฮชแท็ก
              </Heading>
            </CardHeader>
            <CardBody>
              <Box height="300px">
                <ResponsivePie
                  data={data}
                  margin={{ top: 32, right: 32, bottom: 32, left: -150 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={3}
                  activeOuterRadiusOffset={8}
                  borderWidth={1}
                  borderColor={{
                    from: "color",
                    modifiers: [["darker", 0.2]],
                  }}
                  arcLinkLabelsSkipAngle={10}
                  arcLinkLabelsTextColor="#333333"
                  arcLinkLabelsThickness={2}
                  arcLinkLabelsColor={{ from: "color" }}
                  arcLabelsSkipAngle={10}
                  arcLabelsTextColor={{
                    from: "color",
                    modifiers: [["darker", 2]],
                  }}
                  defs={[
                    {
                      id: "dots",
                      type: "patternDots",
                      background: "inherit",
                      color: "rgba(255, 255, 255, 0.3)",
                      size: 4,
                      padding: 1,
                      stagger: true,
                    },
                    {
                      id: "lines",
                      type: "patternLines",
                      background: "inherit",
                      color: "rgba(255, 255, 255, 0.3)",
                      rotation: -45,
                      lineWidth: 6,
                      spacing: 10,
                    },
                  ]}
                  legends={[
                    {
                      anchor: "top-right",
                      direction: "column",
                      justify: false,
                      translateX: 0,
                      translateY: 0,
                      itemsSpacing: 16,
                      itemWidth: 200,
                      itemHeight: 18,
                      itemTextColor: "#999",
                      itemDirection: "left-to-right",
                      itemOpacity: 1,
                      symbolSize: 18,
                      symbolShape: "circle",
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemTextColor: "#000",
                          },
                        },
                      ],
                    },
                  ]}
                />
              </Box>
            </CardBody>
          </Card>
          <Card variant="outline">
            <CardHeader borderBottom="1px solid" borderBottomColor="gray.200">
              <Heading as="h2" fontSize="xl">
                แผนภูมิผู้ใช้งาน
              </Heading>
            </CardHeader>
            <CardBody>
              <Box height="300px">
                <ResponsivePie
                  data={roles}
                  margin={{ top: 32, right: 32, bottom: 32, left: -150 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={3}
                  activeOuterRadiusOffset={8}
                  borderWidth={1}
                  borderColor={{
                    from: "color",
                    modifiers: [["darker", 0.2]],
                  }}
                  arcLinkLabelsSkipAngle={10}
                  arcLinkLabelsTextColor="#333333"
                  arcLinkLabelsThickness={2}
                  arcLinkLabelsColor={{ from: "color" }}
                  arcLabelsSkipAngle={10}
                  arcLabelsTextColor={{
                    from: "color",
                    modifiers: [["darker", 2]],
                  }}
                  defs={[
                    {
                      id: "dots",
                      type: "patternDots",
                      background: "inherit",
                      color: "rgba(255, 255, 255, 0.3)",
                      size: 4,
                      padding: 1,
                      stagger: true,
                    },
                    {
                      id: "lines",
                      type: "patternLines",
                      background: "inherit",
                      color: "rgba(255, 255, 255, 0.3)",
                      rotation: -45,
                      lineWidth: 6,
                      spacing: 10,
                    },
                  ]}
                  legends={[
                    {
                      anchor: "top-right",
                      direction: "column",
                      justify: false,
                      translateX: 0,
                      translateY: 0,
                      itemsSpacing: 16,
                      itemWidth: 200,
                      itemHeight: 18,
                      itemTextColor: "#999",
                      itemDirection: "left-to-right",
                      itemOpacity: 1,
                      symbolSize: 18,
                      symbolShape: "circle",
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemTextColor: "#000",
                          },
                        },
                      ],
                    },
                  ]}
                />
              </Box>
            </CardBody>
          </Card>
        </Stack>
      </Container>
    </>
  );
};
