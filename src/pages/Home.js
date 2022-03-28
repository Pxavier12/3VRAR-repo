/* eslint-disable react-hooks/rules-of-hooks */
import {
  Container,
  Spinner,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorMode,
} from '@chakra-ui/react';

import { IoMdCalendar } from 'react-icons/io';
import { GiMissileLauncher, GiSpy } from 'react-icons/gi';

import { useCallback, useEffect, useState } from 'react';

import spaceApi from '../api/SpaceXapi';
import LatestThreeLaunches from '../components/LatestThreeLaunches';

export const Feature = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex
        w={8}
        h={8}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export function HomeContainer() {
  const [latestThreeLaunchesData, setLatestLaunchesData] = useState([]);
  const [nextLaunchData, setNextLaunchData] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [lastId, setLastId] = useState('');
  const [error, setError] = useState('');
  const color = useColorMode();

  const fetchData =  async () => {
    await spaceApi.getNextLaunch().then(
      result => {
        setNextLaunchData(result.data);
      },
      error => {
        setError(error);
      }
    );

    const id = await (await spaceApi.getLatestLaunch()).data.id
    var data = [];

    for (var i = eval(id); i > eval(id)-3; i--) {
      console.log(i)
      spaceApi.getLaunchById(i)
      .then(res => data.push(res.data));
      console.log(data)
    }
    setLatestLaunchesData(data);
    setDataLoaded(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!dataLoaded) {
    return (
      <Container maxW={'6xl'} py={12}>
        <Spinner size="xl" />
      </Container>
    );
  } else
    return (
      <Container maxW={'6xl'} py={12}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={4}>
            <Text
              textTransform={'uppercase'}
              color={'blue.400'}
              fontWeight={600}
              fontSize={'sm'}
              bg={color !== 'dark' ? 'blue.50' : 'blue.900'}
              p={2}
              alignSelf={'flex-start'}
              rounded={'md'}
            >
              Next Launch
            </Text>

            <Heading>{nextLaunchData.launch_site.site_name_long}</Heading>
            <Text color={'gray.500'} fontSize={'lg'}>
              {nextLaunchData.details}
            </Text>
            <Stack
              spacing={4}
              divider={
                <StackDivider
                  borderColor={color !== 'dark' ? 'gray.100' : 'gray.700'}
                />
              }
            >
              <Feature
                icon={
                  <Icon
                    as={GiMissileLauncher}
                    color={'yellow.500'}
                    w={5}
                    h={5}
                  />
                }
                iconBg={color !== 'dark' ? 'yellow.100' : 'yellow.900'}
                text={nextLaunchData.rocket.rocket_name}
              />
              <Feature
                icon={<Icon as={GiSpy} color={'green.500'} w={5} h={5} />}
                iconBg={color !== 'dark' ? 'green.100' : 'green.900'}
                text={nextLaunchData.mission_name}
              />
              <Feature
                icon={
                  <Icon as={IoMdCalendar} color={'purle.500'} w={5} h={5} />
                }
                iconBg={color !== 'dark' ? 'purple.100' : 'purple.900'}
                text={nextLaunchData.launch_date_utc}
              />
            </Stack>
          </Stack>
          <Flex>
            <Image
              rounded={'md'}
              alt={'feature image'}
              src="/assets/img/SpaceX-Launch.jpeg"
              objectFit={'cover'}
            />
          </Flex>
        </SimpleGrid>
        <LatestThreeLaunches
          latestThreeLaunchesData={latestThreeLaunchesData}
          dataLoaded={dataLoaded}
        />
      </Container>
    );
}
