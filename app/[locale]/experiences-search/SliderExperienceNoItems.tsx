"use client";

import React from 'react';
import { Card, Button, Container, CardBody } from 'react-bootstrap';
import ZIcon from '@/components/icons/ZIcon';
import ButtonDefault from '@/components/buttons/ButtonDefault';
import Title from '@/components/typography/Title';
import { useRouter } from '@/translations-engine/routing';
import { useAppSelector } from '@/redux/hooks';
import { performSearch } from '@/components/SearchSlotsForm/SearchSlotsForm';

interface NoExperiencesFoundProps {
  onResetFilters?: () => void;
}

export default function SliderExperienceNoItems({ onResetFilters }: NoExperiencesFoundProps) {


  const router = useRouter();
  const filters = useAppSelector((state) => state.booking.filters);

  return (
    <section className="slider-no-items">
      <Container>
        <Card>
          <CardBody>
            <div>
              <ZIcon type='search' />
            </div>

            <Title headingType="h4" headingStyle="Display-sm-Semibold" color="--color-text-fg">
              No matching experiences found
            </Title>
            <Title headingType="p" headingStyle="Text-lg-Medium" color="--color-text-fg-subtle">We couldn't find any activities matching your exact combination of dates, group size, or location filters. Try loosening up your criteria to see what's available nearby.</Title>


            {
              /*<Button
              onClick={() => {
                onResetFilters?.();
              }}
            >
              Clear All Filters
            </Button>*/
            }
            <ButtonDefault variant='outline-primary' label="Clear All Filters" onClick={() => {
              // onResetFilters?.();
              performSearch(router, {
                availability: "",
                category: "",
                price_range: "",
                duration: "",
                selectedDates: [],
                participantsCount: { adults: 0, children: 0, infants: 0 },
                city: ""
              });
            }} />
          </CardBody>
        </Card>
      </Container>
    </section>
  );
}