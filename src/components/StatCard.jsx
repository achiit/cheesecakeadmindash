const StatCard = ({ title, value, icon: Icon, color }) => {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-start gap-4">
          <div className={`${color} rounded-lg p-3`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default StatCard;