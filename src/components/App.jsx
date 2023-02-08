import { useState } from 'react';
import { Statistics } from './Statistics/Statistics';
import { Box } from './Box/Box';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Notification } from './Notification/Notification';
import { Card } from './Box/Card';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const clickButton = option => {
    console.log(option);
    switch (option) {
      case 'good':
        setGood(good + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;
      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    const total = good + neutral + bad;
    return total;
  };

  const countPositiveFeedbackPercentage = () => {
    const roundFeedback = (good / countTotalFeedback()) * 100;
    let precentageFeedback = Math.round(roundFeedback);
    return precentageFeedback;
  };

  return (
    <>
      <Box maxWidth="1140px" m="0 auto" background="orange" p="20px">
        <Card
          maxWidth="400px"
          background="gray"
          borderRadius="8px"
          p="20px"
          m="0 auto"
        >
          <Section title="Please leave feedback">
            <FeedbackOptions
              options={['good', 'neutral', 'bad']}
              onLeaveFeedback={clickButton}
            />
          </Section>

          {countTotalFeedback() === 0 ? (
            <Notification title="There is no feedback" />
          ) : (
            <Section title="Statistic">
              <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                total={countTotalFeedback()}
                positivePercentage={
                  isNaN(countPositiveFeedbackPercentage())
                    ? 0
                    : countPositiveFeedbackPercentage()
                }
              />
            </Section>
          )}
        </Card>
      </Box>
    </>
  );
};
