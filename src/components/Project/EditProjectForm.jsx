import React from "react";
import { Form, Input, Modal, Select } from "antd";

const SOption = Select.Option;

export default function EditProjectForm({ hideForm, onSubmit, project }) {
  const [form] = Form.useForm();

  const onEdit = () => {
    form.validateFields().then((formValues) => {
      onSubmit({ ...project, ...formValues });
    });
  };

  return (
    <Modal
      visible
      title="Editar Proyecto"
      okText="Editar"
      onCancel={hideForm}
      onOk={onEdit}
    >
      <Form
        form={form}
        layout="vertical"
        name="edit_project_form"
        initialValues={project}
      >
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
