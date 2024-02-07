'use client'
import React, { useState } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import axios from "axios";


//@ts-ignore
export default function TabelaComponente({users, setUsers, setOnEdit}) {

    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertStatus, setAlertStatus] = useState<"success" | "error" | null>(null);

    const handleDelete = async (id: any) => {
        try {
          await axios.delete("http://localhost:8800/" + id);
          const newArray = users.filter((user: { id: any; }) => user.id !== id);
          setUsers(newArray);
          setAlertMessage("Exclusão realizada com sucesso");
          setAlertStatus("success");
        } catch (error: any) {
          setAlertMessage("Erro ao excluir: " + error.message);
          setAlertStatus("error");
        } finally {
          setOnEdit(null);
        }
      };
    



  return (
    <Box marginTop={"20px"}>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Telefone</Th>
            <Th>Data de Nascimento</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
            
          {users.map((data: any, index: any) => (
            <Tr key={index}>
              <Td>{data.nome}</Td>
              <Td>{data.email}</Td>
              <Td>{data.fone}</Td>
              <Td>{data.data_nascimento}</Td>
              <Td>
                <Button
                  colorScheme="red"
                  onClick={() => handleDelete(data.id)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

