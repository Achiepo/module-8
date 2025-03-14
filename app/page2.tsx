import React, { useState } from 'react';
import { format, formatDate } from 'date-fns';
import { CreditCard, Wallet, Smartphone } from 'lucide-react';
import { FaEye } from 'react-icons/fa'; // Importation des icônes

// Sample data for recent payments
const recentPayments = [
  { id: 1, patient: 'Martin Dubois', service: 'Consultation', amount: 75, date: '2023-05-15', method: 'card', status: 'Payée' },
  { id: 2, patient: 'Sophie Leclerc', service: 'Laboratoire', amount: 120, date: '2023-05-14', method: 'cash', status: 'Payée' },
  { id: 3, patient: 'Jean Moreau', service: 'Radiologie', amount: 200, date: '2023-05-12', method: 'mobile', status: 'En attente' },
  { id: 4, patient: 'Marie Laurent', service: 'Pharmacie', amount: 45, date: '2023-05-10', method: 'card', status: 'Payée' },
  { id: 5, patient: 'Pierre Petit', service: 'Consultation', amount: 75, date: '2023-05-08', method: 'mobile', status: 'Payée' },
];

type Payment = typeof recentPayments[0];

const PatientPaymentForm = () => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    patientName: '',
    serviceType: '',
    amount: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("Paiement enregistré avec succès");
      setFormData({
        patientName: '',
        serviceType: '',
        amount: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        notes: ''
      });
    }, 1500);
  };

  // Payment method selector component
  const PaymentMethodSelector = ({ selectedMethod, onChange }: { selectedMethod: string; onChange: (method: string) => void }) => {
    const methods = [
      {
        id: 'card',
        name: 'Carte',
        icon: <CreditCard className="h-5 w-5" />,
        description: 'Paiement par carte bancaire',
      },
      {
        id: 'cash',
        name: 'Espèces',
        icon: <Wallet className="h-5 w-5" />,
        description: 'Paiement en espèces',
      },
      {
        id: 'mobile',
        name: 'Mobile Money',
        icon: <Smartphone className="h-5 w-5" />,
        description: 'Transfert via mobile',
      },
    ];

    return (
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Mode de paiement</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {methods.map((method) => (
            <div
              key={method.id}
              className={`flex items-center gap-3 p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:border-medical-300 ${selectedMethod === method.id
                  ? 'border-medical-500 bg-medical-50'
                  : 'border-gray-200'
                }`}
              onClick={() => onChange(method.id)}
            >
              <div
                className={`p-2 rounded-full ${selectedMethod === method.id
                    ? 'bg-medical-100 text-medical-700'
                    : 'bg-gray-100 text-gray-600'
                  }`}
              >
                {method.icon}
              </div>
              <div>
                <p className="font-medium text-sm">{method.name}</p>
                <p className="text-xs text-gray-500">{method.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

    function convertToXOF(amount: number): React.ReactNode {
        throw new Error('Function not implemented.');
    }

    function openDialog(payment: { id: number; patient: string; service: string; amount: number; date: string; method: string; status: string; }): void {
        throw new Error('Function not implemented.');
    }

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg space-y-8">
      <div className="flex gap-8">

        {/* Enregistrer Paiement Card */}
        <div className="w-1/2 p-6 bg-white shadow-lg rounded-lg space-y-8">
          <h3 className="text-2xl font-semibold text-gray-800">Enregistrer un paiement</h3>

          <form onSubmit={handleSubmit} className="space-y-6 animate-fade-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">Nom du patient</label>
                <input
                  id="patientName"
                  name="patientName"
                  placeholder="Entrez le nom du patient"
                  value={formData.patientName}
                  onChange={handleInputChange}
                  required
                  className="focus-visible:ring-medical-500 w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">Type de service</label>
                <select
                  id="serviceType"
                  value={formData.serviceType}
                  onChange={(e) => handleSelectChange('serviceType', e.target.value)}
                  required
                  className="focus-visible:ring-medical-500 w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2"
                >
                  <option value="">Sélectionnez un service</option>
                  <option value="consultation">Consultation</option>
                  <option value="diagnostic">Diagnostic</option>
                  <option value="procedure">Procédure médicale</option>
                  <option value="laboratory">Tests laboratoire</option>
                  <option value="pharmacy">Pharmacie</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Montant (CFA)</label>
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                  className="focus-visible:ring-medical-500 w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="focus-visible:ring-medical-500 w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2"
                />
              </div>
            </div>

            <PaymentMethodSelector selectedMethod={paymentMethod} onChange={setPaymentMethod} />

            <div className="space-y-2">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes (optionnel)</label>
              <textarea
                id="notes"
                name="notes"
                placeholder="Ajoutez des notes supplémentaires"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-medical-200 transition-all resize-none"
              ></textarea>
            </div>

            <button type="submit" disabled={loading} className="w-full md:w-auto mx-45 bg-blue-600 hover:bg-medical-700 text-white px-4 py-2 rounded-md focus:outline-none">
              Enregistrer le paiement
            </button>
          </form>
        </div>

        {/* Paiement Récent Card */}
        <div className="w-1/2 p-6 bg-white shadow-lg rounded-lg space-y-8">
          <h3 className="text-2xl font-semibold text-gray-800">Paiements récents</h3>
          <button
                    onClick={() => alert("Voir tous les paiements (fonctionnalité à venir)")}
                    className="border border-gray-300 text-xs py-2 px-4 rounded-md bg-transparent hover:bg-gray-100 ml-4">
                    Voir tous
                  </button>
                </div>
          
                <div className="rounded-lg p-8 mx-4 overflow-hidden w-full border bg-white">
                  <table className="min-w-full table-auto border-collapse text-sm text-center">
                    <thead className="bg-gray-60">
                      <tr>
                        <th className="font-medium px-3 py-2">Patient</th>
                        <th className="font-medium px-3 py-2">Service</th>
                        <th className="font-medium px-3 py-2">Montant</th>
                        <th className="font-medium px-3 py-2">Date</th>
                        <th className="font-medium px-3 py-2">Méthode</th>
                        <th className="font-medium px-3 py-2">Statut</th>
                        <th className="font-medium px-3 py-2 w-[50px]"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentPayments.map((payment) => (
                        <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-3 py-2">{payment.patient}</td>
                          <td className="px-3 py-2">{payment.service}</td>
                          <td className="px-3 py-2">{convertToXOF(payment.amount)}</td>
                          <td className="px-3 py-2">{formatDate(payment.date)}</td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-2 justify-center">
                              {setPaymentMethod(payment.method)}
                              <span className="text-xs capitalize">{payment.method}</span>
                            </div>
                          </td>
                          <td className="px-3 py-2">{getStatusBadge(payment.status)}</td>
                          <td className="px-3 py-2">
                            <div className="flex justify-start gap-2">
                              {/* Bouton Détails */}
                              <button
                                onClick={() => openDialog(payment)}
                                className="flex items-center px-4 py-2 text-sm bg-gray-50 hover:bg-gray-100 space-x-2">
                                <FaEye />
                                <span>Détails</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
          
          
                {/* Modal (Dialog) */}
                {isDialogOpen && selectedPayment && (
                  <div className="fixed inset-0 bg-gray-400 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-lg max-w-sm w-full">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Détails du paiement</h3>
                        <button onClick={closeDialog} className="text-gray-500 text-lg">&times;</button>
                      </div>
                      <div className="mt-3 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-gray-500">Patient</p>
                            <p className="font-medium text-sm">{selectedPayment.patient}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Service</p>
                            <p className="font-medium text-sm">{selectedPayment.service}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Montant</p>
                            <p className="font-medium text-sm">{convertToXOF(selectedPayment.amount)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Date</p>
                            <p className="font-medium text-sm">{formatDate(selectedPayment.date)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Méthode de paiement</p>
                            <div className="flex items-center gap-1.5 mt-1">
                              {getPaymentMethodIcon(selectedPayment.method)}
                              <span className="text-xs capitalize">{selectedPayment.method}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Statut</p>
                            {getStatusBadge(selectedPayment.status)}
                          </div>
                        </div>
                        <button className="mt-4 w-full bg-medical-600 text-white py-2 rounded-md">Fermer</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              

          
        </div>
      </div>
    </div>
  );
};

export default PatientPaymentForm;
