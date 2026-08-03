"use client";

import React from "react";
import { Container, Row, Col, Card, Placeholder } from "react-bootstrap";

export default function CitySkeleton() {
  // Array of 4 items to map out exactly 4 columns in our row
  const totalCards = [1, 2, 3, 4];

  return (
    <Container className="my-5">
      {/* 1. Section Title Placeholders */}
      <div className="mb-4">
        <Placeholder as="div" animation="glow">
          <Placeholder xs={4} className="bg-secondary rounded mb-2" style={{ height: "32px" }} />
          <br />
          <Placeholder xs={6} className="bg-secondary rounded" style={{ height: "18px" }} />
        </Placeholder>
      </div>

      {/* 2. The 4-Card Slider Grid */}
      <Row className="g-4 flex-nowrap overflow-hidden">
        {totalCards.map((index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} style={{ flex: "0 0 auto" }}>
            <Card className="border-0 bg-dark text-white shadow-sm" style={{ borderRadius: "12px" }}>
              
              {/* Fake Image Block */}
              <Placeholder as="div" animation="glow">
                <div 
                  className="placeholder bg-secondary w-100" 
                  style={{ height: "200px", borderRadius: "12px 12px 0 0" }}
                />
              </Placeholder>
              
              {/* Fake Card Body Content */}
              <Card.Body>
                <Placeholder as={Card.Title} animation="glow" className="mb-2">
                  <Placeholder xs={8} className="bg-secondary rounded" />
                </Placeholder>
                
                <Placeholder as={Card.Text} animation="glow" className="mb-0">
                  <Placeholder xs={4} className="bg-secondary rounded small" />
                </Placeholder>
              </Card.Body>

            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}