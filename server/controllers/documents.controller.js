import pdf from 'html-pdf';

import { commisionOrder } from '../documents/commission-order.js';


export const fetchCommissionOrderPdf = async (req, res) => {
  try {
    await res.sendFile('./../result.pdf')
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createCommissionOrderPdf = async (req, res) => {
  try {
    pdf.create(commisionOrder(req.body), {}).toFile('result.pdf', (err) => {
      if (err) {
        res.send(Promise.reject());
      }
      res.send(Promise.resolve());
    });
  } catch (error) {
    console.log(error)
  }
}


