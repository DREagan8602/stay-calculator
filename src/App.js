import React, { useState, useEffect } from 'react';
import { Home, Hotel, DollarSign, Users, Wifi, Car, UtensilsCrossed, Bath, Dumbbell, Coffee, BadgeCheck, Bed, Star, HeartHandshake, Timer, Brain, Award, TrendingUp, LayoutDashboard, Tv, Gamepad, BookOpen, Baby, Bike, Flame, Dog, Trees, Briefcase } from 'lucide-react';

const AccommodationComparison = () => {
  const [costs, setCosts] = useState({
    rental: '',
    hotel: '',
    numPeople: 1,
    numChildren: 0
  });

  const [amenities, setAmenities] = useState({
    kitchen: { name: 'Fully Equipped Kitchen', rental: false, hotel: false, importance: 0, icon: <UtensilsCrossed className="w-4 h-4" /> },
    pool: { name: 'Pool/Hot Tub', rental: false, hotel: false, importance: 0, icon: <Bath className="w-4 h-4" /> },
    wifi: { name: 'WiFi', rental: false, hotel: false, importance: 0, icon: <Wifi className="w-4 h-4" /> },
    parking: { name: 'Private Parking', rental: false, hotel: false, importance: 0, icon: <Car className="w-4 h-4" /> },
    laundry: { name: 'Washer & Dryer', rental: false, hotel: false, importance: 0, icon: <Bath className="w-4 h-4" /> },
    gym: { name: 'Fitness Center', rental: false, hotel: false, importance: 0, icon: <Dumbbell className="w-4 h-4" /> },
    breakfast: { name: 'Breakfast Included', rental: false, hotel: false, importance: 0, icon: <Coffee className="w-4 h-4" /> },
    privateSpace: { name: 'Private Outdoor Space', rental: false, hotel: false, importance: 0, icon: <Trees className="w-4 h-4" /> },
    workspace: { name: 'Home Office/Workspace', rental: false, hotel: false, importance: 0, icon: <Briefcase className="w-4 h-4" /> },
    entertainment: { name: 'Entertainment Systems', rental: false, hotel: false, importance: 0, icon: <Tv className="w-4 h-4" /> },
    games: { name: 'Books & Games', rental: false, hotel: false, importance: 0, icon: <Gamepad className="w-4 h-4" /> },
    fireplace: { name: 'Fireplace', rental: false, hotel: false, importance: 0, icon: <Flame className="w-4 h-4" /> },
    petFriendly: { name: 'Pet Friendly', rental: false, hotel: false, importance: 0, icon: <Dog className="w-4 h-4" /> },
    childAmenities: { name: 'Children\'s Amenities', rental: false, hotel: false, importance: 0, icon: <Baby className="w-4 h-4" /> },
    outdoorEquipment: { name: 'Outdoor Equipment', rental: false, hotel: false, importance: 0, icon: <Bike className="w-4 h-4" /> }
  });

  const [groupType, setGroupType] = useState('adults');
  const [scores, setScores] = useState({ rental: 0, hotel: 0 });
  const importanceLabels = ['Not Important', 'Somewhat Important', 'Important', 'Very Important'];

  const calculateScores = () => {
    const costPerPerson = {
      rental: (parseFloat(costs.rental) || 0) / (costs.numPeople + (costs.numChildren * 0.5)),
      hotel: (parseFloat(costs.hotel) || 0) / (costs.numPeople + (costs.numChildren * 0.5))
    };

    let rentalAmenityScore = 0;
    let hotelAmenityScore = 0;
    let totalPossibleScore = 0;

    Object.values(amenities).forEach(amenity => {
      const weight = amenity.importance;
      totalPossibleScore += weight * 3;
      if (amenity.rental) rentalAmenityScore += weight;
      if (amenity.hotel) hotelAmenityScore += weight;
    });

    const amenityScore = {
      rental: totalPossibleScore ? (rentalAmenityScore / totalPossibleScore) * 10 : 0,
      hotel: totalPossibleScore ? (hotelAmenityScore / totalPossibleScore) * 10 : 0
    };

    const maxCost = Math.max(costPerPerson.rental, costPerPerson.hotel) || 1;
    const costScore = {
      rental: maxCost ? (1 - costPerPerson.rental / maxCost) * 10 : 0,
      hotel: maxCost ? (1 - costPerPerson.hotel / maxCost) * 10 : 0
    };

    return {
      rental: ((costScore.rental * 2 + amenityScore.rental * 3) / 5).toFixed(1),
      hotel: ((costScore.hotel * 2 + amenityScore.hotel * 3) / 5).toFixed(1)
    };
  };

  useEffect(() => {
    setScores(calculateScores());
  }, [costs, amenities, groupType]);

  const getScoreColor = (score) => {
    if (score > 7.5) return 'text-emerald-600';
    if (score > 5) return 'text-blue-600';
    return 'text-gray-600';
  };

  const AmenityRow = ({ id, amenity }) => (
    <div className="bg-white rounded-lg shadow-sm p-3 space-y-2">
      <div className="flex items-center gap-2">
        {amenity.icon}
        <span className="font-medium text-sm">{amenity.name}</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <div className="text-xs text-gray-600">Available at:</div>
          <div className="flex gap-3">
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={amenity.rental}
                onChange={(e) => setAmenities({
                  ...amenities,
                  [id]: { ...amenity, rental: e.target.checked }
                })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-xs">Rental</span>
            </label>
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={amenity.hotel}
                onChange={(e) => setAmenities({
                  ...amenities,
                  [id]: { ...amenity, hotel: e.target.checked }
                })}
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-xs">Hotel</span>
            </label>
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-xs text-gray-600">Importance:</div>
          <select
            value={amenity.importance}
            onChange={(e) => setAmenities({
              ...amenities,
              [id]: { ...amenity, importance: parseInt(e.target.value) }
            })}
            className="w-full text-xs p-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {importanceLabels.map((label, index) => (
              <option key={index} value={index}>{label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Award className="w-12 h-12 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Smart Stay Optimizer</h1>
        <p className="text-lg text-gray-600">AI-Powered Accommodation Analysis</p>
        <div className="flex justify-center gap-4 pt-2">
          <div className="flex items-center gap-2 text-sm text-emerald-600">
            <BadgeCheck className="w-5 h-5" />
            <span>Smart Analysis</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <Timer className="w-5 h-5" />
            <span>Real-time Results</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-purple-600">
            <HeartHandshake className="w-5 h-5" />
            <span>Personalized Match</span>
          </div>
        </div>
      </div>

      <div className="relative p-1 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        <div className="bg-white rounded-xl p-6 space-y-8">
          <div className="relative">
            <div className="absolute -top-3 left-4 bg-blue-100 px-2 py-1 rounded-md">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600">Step 1: Group Details</span>
              </div>
            </div>
            <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-xl p-6 border border-blue-100">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Adults</label>
                <input
                  type="number"
                  min="1"
                  value={costs.numPeople}
                  onChange={(e) => setCosts({ ...costs, numPeople: Math.max(1, parseInt(e.target.value) || 1) })}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Children</label>
                <input
                  type="number"
                  min="0"
                  value={costs.numChildren}
                  onChange={(e) => setCosts({ ...costs, numChildren: Math.max(0, parseInt(e.target.value) || 0) })}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Group Type</label>
                <select
                  value={groupType}
                  onChange={(e) => setGroupType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="adults">Adults Only</option>
                  <option value="family">Family with Children</option>
                  <option value="business">Business Trip</option>
                </select>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-3 left-4 bg-emerald-100 px-2 py-1 rounded-md">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-600">Step 2: Cost Comparison</span>
              </div>
            </div>
            <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-xl p-6 border border-emerald-100">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vacation Rental Total Cost ($)</label>
                <input
                  type="number"
                  value={costs.rental}
                  onChange={(e) => setCosts({ ...costs, rental: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hotel Total Cost ($)</label>
                <input
                  type="number"
                  value={costs.hotel}
                  onChange={(e) => setCosts({ ...costs, hotel: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-3 left-4 bg-purple-100 px-2 py-1 rounded-md">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-600">Step 3: Rate Amenities</span>
              </div>
            </div>
            <div className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(amenities).map(([id, amenity]) => (
                <AmenityRow key={id} id={id} amenity={amenity} />
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-3 left-4 bg-pink-100 px-2 py-1 rounded-md">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-pink-600" />
                <span className="text-sm font-semibold text-pink-600">Final Analysis</span>
              </div>
            </div>
            <div className="pt-4 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 rounded-xl p-6 border border-blue-200 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-600 rounded-lg">
                        <Home className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-blue-900">Vacation Rental</h3>
                    </div>
                    <span className={`text-3xl font-bold ${getScoreColor(scores.rental)}`}>
                      {scores.rental}
                    </span>
                  </div>
                  <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${Math.max(0, Math.min(100, scores.rental * 10))}%` }}
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 via-purple-100 to-pink-100 rounded-xl p-6 border border-purple-200 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-600 rounded-lg">
                        <Hotel className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-purple-900">Hotel</h3>
                    </div>
                    <span className={`text-3xl font-bold ${getScoreColor(scores.hotel)}`}>
                      {scores.hotel}
                    </span>
                  </div>
                  <div className="h-2 bg-purple-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-600 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${Math.max(0, Math.min(100, scores.hotel * 10))}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-6 h-6 text-emerald-600" />
                  <h4 className="text-lg font-semibold text-gray-900">Smart Recommendation</h4>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {parseFloat(scores.rental) > parseFloat(scores.hotel) ? (
                    <span>
                      Based on our comprehensive analysis, we recommend booking a <strong className="text-blue-600">Vacation Rental</strong>. 
                      {groupType === 'family' && amenities.kitchen.rental && 
                        ' The kitchen facility will be particularly valuable for family meals.'}
                      {costs.numPeople > 2 && 
                        ' The space will better accommodate your group size.'}
                    </span>
                  ) : (
                    <span>
                      Our analysis suggests a <strong className="text-purple-600">Hotel</strong> as the optimal choice for your needs. 
                      {groupType === 'family' && amenities.breakfast.hotel && 
                        ' The included breakfast service will be convenient for your family.'}
                      {groupType === 'business' && 
                        ' The professional amenities will support your business needs.'}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccommodationComparison;