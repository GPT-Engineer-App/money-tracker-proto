import React, { useState } from "react";
import { Box, Button, ChakraProvider, Divider, Flex, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Table, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, VStack, theme } from "@chakra-ui/react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
// Removed import of CSVLink as it's not allowed in the current project setup

const Index = () => {
  // Dummy data for transactions
  const initialTransactions = [
    { id: 1, date: "2023-04-01", amount: 500, type: "Income", category: "Salary" },
    { id: 2, date: "2023-04-02", amount: 50, type: "Expense", category: "Groceries" },
    // ... more transactions
  ];

  const initialCategories = ["Salary", "Groceries", "Bills", "Entertainment", "Other"];

  const [transactions, setTransactions] = useState(initialTransactions);
  const [categories] = useState(initialCategories);
  const [formValues, setFormValues] = useState({});
  const [editingId, setEditingId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddTransaction = () => {
    setEditingId(null);
    setFormValues({});
    onOpen();
  };

  const handleEditTransaction = (transaction) => {
    setEditingId(transaction.id);
    setFormValues(transaction);
    onOpen();
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = () => {
    if (editingId) {
      setTransactions(transactions.map((transaction) => (transaction.id === editingId ? { ...transaction, ...formValues } : transaction)));
    } else {
      setTransactions([...transactions, { id: Date.now(), ...formValues }]);
    }
    onClose();
  };

  const transactionTable = (
    <Table variant="simple" colorScheme="teal">
      <Thead>
        <Tr>
          <Th>Date</Th>
          <Th>Amount</Th>
          <Th>Type</Th>
          <Th>Category</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {transactions.map((transaction) => (
          <Tr key={transaction.id}>
            <Td>{transaction.date}</Td>
            <Td isNumeric>{transaction.amount}</Td>
            <Td>{transaction.type}</Td>
            <Td>{transaction.category}</Td>
            <Td>
              <Button size="sm" onClick={() => handleEditTransaction(transaction)}>
                <FaEdit />
              </Button>
              <Button size="sm" onClick={() => handleDeleteTransaction(transaction.id)} ml={2}>
                <FaTrash />
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );

  const transactionForm = (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{editingId ? "Edit Transaction" : "Add Transaction"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Date</FormLabel>
            <Input type="date" name="date" value={formValues.date || ""} onChange={handleFormChange} />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Amount</FormLabel>
            <Input type="number" name="amount" value={formValues.amount || ""} onChange={handleFormChange} />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Type</FormLabel>
            <Select name="type" value={formValues.type || ""} onChange={handleFormChange}>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </Select>
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Category</FormLabel>
            <Select name="category" value={formValues.category || ""} onChange={handleFormChange}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
    <ChakraProvider theme={theme}>
      <Box bg="gray.800" minH="100vh" color="white">
        <Flex>
          <Box w="250px" p={5}>
            <Heading size="md" mb={5} color="white">
              PFM Dashboard
            </Heading>
            <VStack align="stretch" spacing={4}>
              {/* Add Sidebar Content here */}
            </VStack>
          </Box>
          <Divider orientation="vertical" />
          <Box flex="1" p={5}>
            <Heading size="lg" mb={5} color="white">
              Transactions
            </Heading>
            <Button leftIcon={<FaPlus />} colorScheme="teal" variant="outline" onClick={handleAddTransaction}>
              Add Transaction
            </Button>
            <Box mt={5}>{transactionTable}</Box>
          </Box>
        </Flex>
        {transactionForm}
      </Box>
    </ChakraProvider>
  );
};

export default Index;
