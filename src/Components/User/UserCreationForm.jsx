import React from "react";
import { Form, Input, Modal } from "antd";

export default function UserCreationForm({ hideForm }) {
  const [form] = Form.useForm();

  const onCreate = () => {
    form
      .validateFields()
      .then((formValues) => {
        console.log(formValues);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      visible
      title="Crear nuevo usuario"
      okText="Crear"
      onCancel={hideForm}
      onOk={onCreate}
    >
      <Form form={form} layout="vertical" name="creation_user_form">
        <Form.Item
          name="username"
          label="Nombre de usuario"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Contraseña"
          rules={[{ required: true }]}
        >
          <Input type="password" autoComplete="new-password" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
