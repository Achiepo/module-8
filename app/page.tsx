"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { ChartPie, CreditCard, TrendingUp, Users, AlertCircle, Send, ChevronRight } from "lucide-react";
import Page from "@/components/paiement";

// Enregistrement des composants nécessaires pour Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Données pour le graphique en aire (Ventes mensuelles)
const salesData = {
  labels: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
  datasets: [
    {
      label: "Ventes (en FCFA)",
      data: [2500, 3000, 3500, 4000, 4500, 5000, 6000, 6500, 7000, 7500, 8000, 8500], // Remplace ces valeurs par tes données réelles
      fill: true,
      borderColor: "rgba(75, 192, 192, 1)",
      tension: 0.4,
      backgroundColor: "rgba(75, 192, 192, 0.2)",
    },
  ],
};

// Options du graphique en aire
const salesOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Graphique des Ventes Mensuelles (en FCFA)",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value: any) => `${value} FCFA`,
      },
    },
  },
};

// Données pour le graphique des revenus mensuels
const revenueData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      data: [0, 1, 5, 2, 2, 5, 6, 6, 5, 7, 4, 3], // Assure-toi d'ajouter une donnée pour chaque mois
    },
  ],
};

// Cartes statistiques (Exemple de cartes avec des icônes et des chiffres)
const periods = ["Jour", "Semaine", "Mois", "Année"];

const unpaidInvoices = [
  { id: 1, patient: "Thomas Bernard", service: "Radiologie", amount: 250, dueDate: "2023-06-01", daysPast: 2 },
  { id: 2, patient: "Claire Dupont", service: "Consultation spécialiste", amount: 120, dueDate: "2023-05-25", daysPast: 8 },
  { id: 3, patient: "Michel Rousseau", service: "Tests laboratoire", amount: 85, dueDate: "2023-05-15", daysPast: 18 },
];

const Index = () => {
  const [activePeriod, setActivePeriod] = useState("Mois");

  const handleSendReminder = (id: number) => {
    alert(`Rappel envoyé pour la facture #${id}`);
  };

  return (
    <>
      <Head>
        <title>Graphiques de Ventes et Revenus</title>
        <meta name="description" content="Graphiques des ventes et des revenus mensuels" />
      </Head>

      <div className="min-h-screen bg-gray-50 flex flex-col">
        <main className="flex-1 container px-4 md:px-6 pb-12 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestion de Facturation et Ventes</h1>
              <p className="text-gray-500 mt-1">Automatisez le suivi des paiements et des finances</p>
            </div>
          </div>

          {/* Cartes Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-6 w-6 text-green-500" />
                <h2 className="ml-2 text-xl font-semibold text-gray-900">Revenus ce mois</h2>
              </div>
              <p className="text-2xl font-bold text-gray-900">24 500 FCFA</p>
              <p className="text-gray-500">125 transactions</p>
              <div className="mt-4 text-green-500">
                <span>+12%</span> par rapport au mois dernier
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <CreditCard className="h-6 w-6 text-red-500" />
                <h2 className="ml-2 text-xl font-semibold text-gray-900">Factures en attente</h2>
              </div>
              <p className="text-2xl font-bold text-gray-900">3 450 FCFA</p>
              <p className="text-gray-500">8 factures impayées</p>
              <div className="mt-4 text-red-500">
                <span>-2%</span> par rapport au mois dernier
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-blue-500" />
                <h2 className="ml-2 text-xl font-semibold text-gray-900">Nouveaux patients</h2>
              </div>
              <p className="text-2xl font-bold text-gray-900">35</p>
              <p className="text-gray-500">Ce mois-ci</p>
              <div className="mt-4 text-blue-500">
                <span>+8</span> par rapport au mois dernier
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <ChartPie className="h-6 w-6 text-yellow-500" />
                <h2 className="ml-2 text-xl font-semibold text-gray-900">Taux de recouvrement</h2>
              </div>
              <p className="text-2xl font-bold text-gray-900">92%</p>
              <p className="text-gray-500">Objectif: 95%</p>
              <div className="mt-4 text-yellow-500">
                <span>+3%</span> par rapport au mois dernier
              </div>
            </div>
          </div>

          {/* Graphiques des Revenus et Ventes */}
          <div className="flex gap-6 mb-8">
            <div className="flex-1 p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900">Évolution des Ventes Mensuelles</h3>
              <Line data={salesData} options={salesOptions} />
            </div>

            <div className="flex-1 p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900">Évolution des Revenus</h3>
              <div className="h-[300px] w-full">
                {/* Tu peux personnaliser ici un autre graphique ou SVG pour les revenus */}
                <Line data={revenueData} options={{ responsive: true }} />
              </div>
            </div>
          </div>

          {/* Section des Factures Impayées */}
          <div className="flex-1 p-6 bg-white shadow-lg rounded-lg">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-semibold text-gray-900">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                Factures impayées
              </h3>
              <button className="px-3 py-1 text-xs font-medium bg-blue-500 text-white rounded-lg">
                Voir toutes les factures
              </button>
            </div>

            <div className="space-y-4">
              {unpaidInvoices.map((invoice) => (
                <div key={invoice.id} className="p-4 border-l-4 border-amber-400 hover:shadow-md transition-all rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h4 className="font-medium text-gray-900">{invoice.patient}</h4>
                        <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-800">
                          {invoice.daysPast} jours de retard
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {invoice.service} - {invoice.amount} FCFA
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button onClick={() => handleSendReminder(invoice.id)} className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800">
                        <Send className="h-4 w-4 mr-1" />
                        Relancer
                      </button>
                      <button className="h-8 w-8 flex items-center justify-center bg-gray-100 rounded-full">
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {unpaidInvoices.length === 0 && <div className="text-center py-8 text-gray-500">Aucune facture impayée.</div>}
            </div>
          </div>
        </main>
      </div>
      <div className="bg-gray-50"><Page /></div>
    </>
  );
};

export default Index;
    
    
    
    
    
    
    
    
  