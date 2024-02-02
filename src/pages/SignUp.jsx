//회원 가입 페이지
import React, {useEffect, useState} from "react"
import Form from 'react-bootstrap/Form';

const SignUp = () => {
    return (
        <div>
            <div>회원가입</div>

            <Form>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
            </Form>
        </div>
    )
}

export default SignUp;