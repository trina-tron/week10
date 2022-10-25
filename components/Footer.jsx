import { ButtonGroup, Button, useToast,Box, Container, IconButton, Stack, Text } from '@chakra-ui/react'
import { FaPeace, FaPalette, FaCat, FaRainbow } from 'react-icons/fa'


 const Footer = () => {
    const toast = useToast()
    const handlefirstToast = ()=>{
        toast({
            position: 'top',
            render: () => (
              <Box color='white' p={3} bg='blue.500'>
                Remember to relax!
              </Box>
            ),
          })
    }
    const handlesecondToast = ()=>{
        toast({
            position: 'top',
            render: () => (
              <Box color='white' p={3} bg='purple.500'>
                Remember to be creative!
              </Box>
            ),
          })
    }
    const handlethirdToast = ()=>{
        toast({
            position: 'top',
            render: () => (
              <Box color='white' p={3} bg='pink.500'>
                Remember to be grateful!
              </Box>
            ),
          })
    }
    return (
  <Container as="footer" role="contentinfo" py={{ base: '12', md: '16' }} mt='450'>
    <Stack spacing={{ base: '4', md: '5' }}>
      <Stack justify="space-between" direction="row" align="center">
        <FaCat fontSize="1.25rem" />
        <Text fontSize="sm" color="subtle">
        &copy; {new Date().getFullYear()} Site by Trina Williams. All rights reserved.
      </Text>
        <ButtonGroup variant="ghost">
        
          <IconButton as="a" href="#" aria-label="Peace sign" icon={<FaPeace fontSize="1.25rem" />} 
            onClick={()=>handlefirstToast()}
          />
          <IconButton
            as="a"
            href="#"
            onClick={()=>handlesecondToast()}
            aria-label="painter palette"
            icon={<FaPalette fontSize="1.25rem" />}
          />
          <IconButton
            as="a"
            href="#"
            onClick={()=>handlethirdToast()}
            aria-label="rainbow"
            icon={<FaRainbow fontSize="1.25rem" />}
          />
        </ButtonGroup>
      </Stack>
     
    </Stack>
  </Container>
)
    };
    export default Footer;