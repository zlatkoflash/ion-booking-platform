"use client";

import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { Button, Collapse, Card } from 'react-bootstrap';

export default function PaymentHistoryCollapseSection() {
  const [open, setOpen] = useState(false);

  const tCommon = useTranslations("Common");

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="payment-history-collapse"
        aria-expanded={open}
        variant="primary"
      >
        {open ? tCommon('hide_payment_history') : tCommon('show_payment_history')}
      </Button>

      <Collapse in={open}>
        <div id="payment-history-collapse">
          <Card body>
            {/* Payment history details go here */}
            {
              tCommon("your_payment_history_details_and_transaction_logs")
            }
          </Card>
        </div>
      </Collapse>
    </>
  );
}