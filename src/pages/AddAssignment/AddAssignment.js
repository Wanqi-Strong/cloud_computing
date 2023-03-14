import React, { useState, useEffect } from "react";

import "@aws-amplify/ui-react/styles.css";
import { API } from "aws-amplify";
import {
    Button,
    Flex,
    Heading,
    Text,
    TextField,
    View,
} from "@aws-amplify/ui-react";

import { listAssignments } from './../../graphql/queries'

import { createAssignment as createAssignmentApi } from './../../graphql/mutations'

const AddAssignment = (props) => {
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        fetchAssignments();
    }, []);

    function signOut() {
        props.signOut();
    }

    async function fetchAssignments() {
        const apiData = await API.graphql({ query: listAssignments });
        const assignmentsList = apiData.data.listAssignments.items;
        setAssignments(assignmentsList);
    }

    async function createAssignment(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const data = {
            name: form.get("name"),
            description: form.get("description"),
            start_date: form.get("start_date"),
            end_date: form.get("end_date"),
            weightage: parseFloat(form.get("weightage")),
            module: form.get("module"),
        };
        await API.graphql({
            query: createAssignmentApi,
            variables: { input: data },
        });
        fetchAssignments();
        event.target.reset();
    }

    return (
        <View className="App">
            <Heading level={1}>My Assignment Record</Heading>
            <Button onClick={signOut}>sign out</Button>
            <View as="form" margin="3rem 0" onSubmit={createAssignment}>
                <Flex direction="row" justifyContent="center">
                    <TextField
                        name="name"
                        placeholder="Assignment Name"
                        label="Name"
                        labelHidden
                        variation="quiet"
                        required
                    />
                    <TextField
                        name="description"
                        placeholder="Assignment Description"
                        label="Description"
                        labelHidden
                        variation="quiet"
                        required
                    />
                    <TextField
                        name="start_date"
                        placeholder="Assignment start_date"
                        label="start_date"
                        labelHidden
                        variation="quiet"
                        required
                    />
                    <TextField
                        name="end_date"
                        placeholder="Assignment end_date"
                        label="end_date"
                        labelHidden
                        variation="quiet"
                        required
                    />
                    <TextField
                        name="weightage"
                        placeholder="Assignment weightage"
                        label="weightage"
                        labelHidden
                        variation="quiet"
                        required
                    />
                    <TextField
                        name="module"
                        placeholder="Assignment module"
                        label="module"
                        labelHidden
                        variation="quiet"
                        required
                    />
                    <Button type="submit" variation="primary">
                        Create Note
                    </Button>
                </Flex>
            </View>
            <Heading level={2}>Current Assignment</Heading>
            <View margin="3rem 0">
                {assignments.map((assignment) => (
                    <Flex
                        key={assignment.id || assignment.name}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Text as="strong" fontWeight={700}>
                            {assignment.name}
                        </Text>
                        <Text as="span">{assignment.description}</Text>
                        <Text as="span">{assignment.start_date}</Text>
                        <Text as="span">{assignment.end_date}</Text>
                        <Text as="span">{assignment.weightage}</Text>
                        <Text as="span">{assignment.module}</Text>
                    </Flex>
                ))}
            </View>
        </View>
    );
}
export default AddAssignment;