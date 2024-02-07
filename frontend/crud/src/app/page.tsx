'use client'
import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import FormularioComponente from "../components/form";
import TabelaComponente from "../components/grid";
import axios from "axios";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a: any, b: any) => (a.nome > b.nome ? 1 : -1)));
    } catch (error: any) {
      alert(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <>
      <Flex 
       alignItems={'center'}
       margin={"50px 10px 10px 10px"}
       flexDirection={'column'}
       >
        <Text fontSize="50px" color="tomato">
          Form
        </Text>

        <FormularioComponente onEdit={onEdit} setOnEdit={setOnEdit} getUser={getUsers} />
        
     

      <TabelaComponente setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
      </Flex>
    </>
  );
}
