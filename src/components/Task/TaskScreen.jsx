import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Layout, Menu, Table, Button, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CreateTaskForm from "./CreateTaskForm";
import { createTask, getTasks, updateTask } from "../../api_functions";
import EditTaskForm from "./EditTaskForm";
import { useAuth } from "../../auth_functions";

const { Content, Header } = Layout;
const { Title } = Typography;

export default function TaskScreen(props) {
  const [taskList, setTaskList] = useState([]);
  const [creationVisible, setCreationVisible] = useState(false);
  const [taskForEdit, setTaskForEdit] = useState({});
  let auth = useAuth();
  const { user } = auth;
  const { userName = "" } = user;


  useEffect(() => {
    getTasks().then((tasks) => setTaskList(tasks));
  }, []);

  const create = (formValues) => {
    createTask(formValues).then(() => {
      setCreationVisible(false);
      getTasks().then((tasks) => setTaskList(tasks));
    });
  };

  const onEdit = (selected) => setTaskForEdit(selected);
  const update = (formValues) => {
    updateTask(formValues).then(() => {
      setTaskForEdit({});
      getTasks().then((tasks) => setTaskList(tasks));
    });
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <div className="logo" />
        <div style={{ float: "right" }}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">{userName.toUpperCase()}</Menu.Item>
          </Menu>
        </div>
      </Header>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <div style={{ width: "80%", margin: "auto" }}>
          <Link to="/">Volver al Dashboard</Link>
          <Title level={5} style={{ textAlign: "center" }}>
            Listado de Tareas
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{
                marginLeft: "20px",
                marginBottom: "10px",
                float: "right",
              }}
              onClick={() => setCreationVisible(true)}
            >
              Crear Tarea
            </Button>
          </Title>
          <Table
            rowKey="id"
            dataSource={taskList}
            columns={getColumns(onEdit)}
          />

          {creationVisible && (
            <CreateTaskForm
              hideForm={() => setCreationVisible(false)}
              onSubmit={create}
            />
          )}

          {taskForEdit.id && (
            <EditTaskForm
              task={taskForEdit}
              hideForm={() => setTaskForEdit({})}
              onSubmit={update}
            />
          )}
        </div>
      </Content>
    </Layout>
  );
}

const getColumns = (onEdit) => [
  {
    title: "Descripción",
    dataIndex: "descripcion",
    width: "30%",
  },
  {
    title: "Estado",
    dataIndex: "estado",
    render: (e) => {
      return <Tag color="blue">{e}</Tag>;
    },
  },
  {
    title: "Proyecto",
    dataIndex: ["proyecto", "nombre"],
  },
  {
    title: "Tarea Padre",
    dataIndex: ["tareaPadre", "descripcion"],
  },
  {
    title: "Acciones",
    key: "actions",
    render: (text, record) => (
      <Button
        onClick={() => onEdit(record)}
        disabled={record.lineaBase !== null}
        type="link"
      >
        Editar
      </Button>
    ),
  },
];
