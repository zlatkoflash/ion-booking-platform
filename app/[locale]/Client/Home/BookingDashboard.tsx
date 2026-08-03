"use client"

import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const BookingDashboard = ({
  stats
}: {
  stats: {
    total: number;
    pending: number;
    reserved: number;
    completed: number;
    cancelled: number;
    forbidden: number;
  }
}) => {
  return (
    <section className="booking-dashboard-stats">
      <Container className="my-4">
        {/* Row 1: Dashboard Metrics */}
        <Row className="mb-4">
          <Col>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Booking Overview</Card.Title>
                <Row>
                  {[
                    { label: 'Total', value: stats.total },
                    { label: 'Pending', value: stats.pending },
                    { label: 'Reserved', value: stats.reserved },
                    { label: 'Completed', value: stats.completed },
                    { label: 'Cancelled', value: stats.cancelled },
                    { label: 'Forbidden', value: stats.forbidden },
                  ].map((item, index) => (
                    <Col key={index} className="text-center">
                      <div className="h4">{item.value}</div>
                      <div className="text-muted">{item.label}</div>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Row 2: Action Buttons (Right-aligned) */}
        <Row>
          <Col className="d-flex justify-content-end gap-2">
            <Button variant="outline-primary">Booking and Refunds</Button>
            <Button variant="primary">Checkout Pending Bookings</Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BookingDashboard;