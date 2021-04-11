import React, { useEffect, useState } from "react";
import { Col, Form, Input, Modal, Row, Select } from "antd";
import { getRoles } from "../../api_functions";

export default function UserCreationForm({ hideForm, onSubmit }) {
  const [form] = Form.useForm();
  const [roleList, setRoleList] = useState([]);

  useEffect(() => {
    getRoles().then((list) => {
      setRoleList(list);
    });
  }, []);

  const onCreate = () => {
    form.validateFields().then(({ roleIds, ...formValues }) => {
      const roles = roleIds.map((id) => {
        return { id };
      });
      onSubmit({ ...formValues, roles });
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
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="userName"
              label="Nombre de usuario"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="encrytedPassword"
              label="Contraseña"
              rules={[{ required: true }]}
            >
              <Input type="password" autoComplete="new-password" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="roleIds"
              label="Roles"
              rules={[{ required: true }]}
            >
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Seleccione los roles"
              >
                {roleList.map(({ id, role }) => (
                  <Select.Option value={id} key={id}>
                    {role}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="nombre"
              label="Nombre"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="apellido"
              label="Apellido"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="email" label="Email" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
