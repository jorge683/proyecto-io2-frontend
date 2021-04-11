import React, { useEffect, useState } from "react";
import { Form, Input, Modal, Select } from "antd";
import { getPermits } from "../../api_functions";

export default function RoleCreationForm({ hideForm, onSubmit }) {
  const [form] = Form.useForm();
  const [permitList, setPermitList] = useState([]);

  useEffect(() => {
    getPermits().then((list) => {
      setPermitList(list);
    });
  }, []);

  const onCreate = () => {
    form.validateFields().then(({ permitIds, ...formValues }) => {
      const permits = permitIds.map((id) => {
        return { permit: { id } };
      });
      onSubmit({ ...formValues, permits });
    });
  };

  return (
    <Modal
      visible
      title="Crear nuevo role"
      okText="Crear"
      onCancel={hideForm}
      onOk={onCreate}
    >
      <Form form={form} layout="vertical" name="creation_role_form">
        <Form.Item
          name="role"
          label="Nombre del Rol"
          rules={[{ required: true }]}
        >
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item
          name="permitIds"
          label="Permisos"
          rules={[{ required: true }]}
        >
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Seleccione los permisos"
          >
            {permitList.map((p) => (
              <Select.Option value={p.id} key={p.id}>
                {p.displayName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
