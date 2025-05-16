const Payment = require('../models/payment');
const luhnCheck = require('../utils/luhnCheck');
const { encrypt, maskCard } = require('../utils/cardUtils');

exports.addPayment = async (req, res) => {
  const { user_id } = req.params;
  const { amount, currency, description, card_no, card_expiry, card_cvc } = req.body;

  if (!luhnCheck(card_no)) return res.status(400).json({ error: 'Invalid card number' });

  try {
    const payment = await Payment.create({
      user_id,
      amount,
      currency,
      description,
      card_no: maskCard(card_no),
      card_expiry,
      card_cvc: encrypt(card_cvc)
    });
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to record payment' });
  }
};

exports.getPayments = async (req, res) => {
  const payments = await Payment.findAll({ where: { user_id: req.params.user_id } });
  res.json(payments);
};
