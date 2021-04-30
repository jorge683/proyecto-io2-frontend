import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Layout,
  Menu,
  Button,
  Card,
  Timeline,
  Row,
  Col,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { createBL, getBLs } from "../../api_functions";
import BaseLineCreationForm from "./BaseLineCreationForm";
import { useAuth } from "../../auth_functions";

const { Content, Header } = Layout;
const { Title } = Typography;

export default function BaseLineScreen(props) {
  const [creationVisible, setCreationVisible] = useState(false);
  const [baseLines, setBaseLines] = useState([]);
  let auth = useAuth();
  const { user } = auth;
  const { userName = "" } = user;

  useEffect(() => {
    getBLs().then((list) => setBaseLines(list));
  }, []);

  const create = (formValues) => {
    createBL(formValues).then(() => {
      setCreationVisible(false);
      getBLs().then((list) => setBaseLines(list));
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
        <div style={{ margin: "auto", width: "90%", clear: "both" }}>
          <Link to="/">Volver al Dashboard</Link>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ right: "15px", position: "absolute" }}
            onClick={() => setCreationVisible(true)}
          >
            Crear Linea Base
          </Button>
          <Title level={2} style={{ textAlign: "center" }}>
            Lineas Base ({baseLines.length || "-"})
          </Title>
          <div>
            <Row justify="center" gutter={16}>
              {baseLines.map(({ id, code, tareas }) => {
                return (
                  <Col key={id}>
                    <Card title={`Linea Base: Cod. ${code}`}>
                      <Timeline>
                        {tareas.map(
                          ({ id: itemId, descripcion: d, estado }) => {
                            return (
                              <Timeline.Item key={itemId}>
                                {d} - <strong>{estado}</strong>
                              </Timeline.Item>
                            );
                          }
                        )}
                      </Timeline>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>

        {creationVisible && (
          <BaseLineCreationForm
            hideForm={() => setCreationVisible(false)}
            onSubmit={create}
          />
        )}
      </Content>
    </Layout>
  );
}
