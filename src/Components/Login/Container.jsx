import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button } from "antd";

import { loginUser } from "../../api_functions";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function Container() {
  let history = useHistory();
  const onFinish = ({ username, password }) => {
    history.push("/dashboard", { username });

    /** Esto se debe integrar cuando este listo el nuevo login  */

    //loginUser(username, password).then((isValid) => {
    //  history.push("/dashboard", { username });
    //  message.error("Credenciales invalidas");
    //});
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ width: "30%", margin: "auto", paddingTop: "5%" }}>
      <Form
        {...layout}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="Usuario" name="username" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
