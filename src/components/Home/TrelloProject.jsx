import React, { useState } from 'react'
import { useCollection } from '../../hooks/Firebase/useCollection';
import { useFirestore } from '../../hooks/Firebase/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';

import styled from "styled-components";

import TrelloColumn from './TrelloColumn';


const StyledProjectInfo = styled.div`
    color: white;
    display: flex;
    justify-content: left;
    align-items: center;
    &>h2 {
        font-size: 1rem;
        margin: .5rem 2rem;
    }
`;
const StyledWorkspace = styled.div`
    display: flex;
    align-items: flex-start;
    overflow: auto;
    padding-right: 2em;
    &>button {
        align-self: center;
        font-size: 2rem;
        font-weight: 100;
        color: white;
        background-color: #ffffff45;
        border-radius: 3px;
        margin: 1rem;
        padding: .2em .7em;
    }
    &>button:hover{
        background-color: #d4d4d445;

    }

`;



export default function TrelloProject({ project }) {


    const { user } = useAuthContext();
    const { addDocument, deleteDocument } = useFirestore(`projects/${project}/columns`);
    const { documents } = useCollection(`projects/${project}/columns`);

    return (
        <>
            <StyledWorkspace>
                {
                    documents && documents.map((column) => {
                        return (
                            <TrelloColumn
                                key={column.id}
                                columnId={column.id}
                                title={column.title}
                                path={`projects/${project}/columns/${column.id}`}
                                deleteColumn={deleteDocument}
                            />
                        )
                    })
                }

                <button onClick={() => {
                    addDocument({ uid: user.uid, title: "New Column" });
                }}>+</button>
            </StyledWorkspace>
        </>
    )
}