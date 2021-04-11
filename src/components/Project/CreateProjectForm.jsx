import React from "react";
import { Form, Input, Modal, Select } from "antd";

const SOption = Select.Option;

export default function CreateProjectForm({ hideForm, onSubmit }) {
  const [form] = Form.useForm();

  const onCreate = () => {
    form.validateFields().then((formValues) => {
      onSubmit(formValues);
    });
  };

  return (
    <Modal
      visible
      title="Crear Proyecto"
      okText="Crear"
      onCancel={hideForm}
      onOk={onCreate}
    >
      <Form form={form} layout="vertical" name="creation_project_form">
        <Form.Item
          name="nombre"
          label="Nombre Proyecto"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="estado" label="Estado" rules={[{ required: true }]}>
          <Select style={{ width: "100%" }} placeholder="Seleccione un estado">
            <SOption value="ACTIVO">ACTIVO</SOption>
            <SOption value="INACTIVO">INACTIVO</SOption>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
