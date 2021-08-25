import './health-plan.css';
import React, {useState, useEffect} from 'react';

function App() {
  const [plan_item, setItems] = useState([]);
  const [plans, setPlans] = useState([]);
  const [plan_items, setPlansItems] = useState([]);


  useEffect(() => {
    const fetchPlanItems = async () => {
      const response = await fetch('http://localhost:3001/getHealthPlanItem');
      const itemData = await response.json();
      setItems(itemData);
    }
    fetchPlanItems();

    const fetchPlans = async() => {
      const response = await fetch('http://localhost:3001/getHealthPlans');
      const itemData = await response.json();
      setPlans(itemData);
    }
    fetchPlans();

    const fetchPlansItems = async () => {
      const response = await fetch('http://localhost:3001/getHealthPlansItems');
      const itemData = await response.json();
      setPlansItems(itemData);
    }
    fetchPlansItems();

    console.log(plan_item);
    console.log(plans);
    console.log(plan_items);
  }, []);

  return (
    <div className="page-health-plan">
      <div className="page-container">
        <div className="plans-container">
          <h1>Choose a plan</h1>
          {plan_item.length > 0 ? (
              <div class="plans-wrapper">
                <div className="side-col hidden-xs">
                    {plan_item.map(item => (<span>{item.item_name}</span>))}
                </div>
                <div className="plans">
                  {plans != null ? (
                    plans.map(plan => (
                      <div>
                        <span className="plans-header">{plan.title}</span>
                        {plan_items.filter(p_item => p_item.plan_id == plan.plan_id).map(filteredItem => (
                          filteredItem.is_checked.data[0] ? (
                            <span>
                              <img src="/images/check.png" alt="" />
                              <span class="sm-item-title hidden-lg">{plan_item[filteredItem.item_id - 1].item_name}</span>
                            </span>
                          ) : <span>
                                <img src="/images/remove.png" alt="" />
                              <span class="sm-item-title hidden-lg">{plan_item[filteredItem.item_id - 1].item_name}</span>
                              </span>
                        ))}
                        <span class="price">
                          <input type="radio" name="plan" value="standard" />
                          <label>HK${plan.value_per_month}<span>/Month</span></label>
                        </span>

                      </div>
                    ))
                  ) : ""}
                </div>
              </div>
          ) : <div class="loader"></div>}
        </div>
      </div>
    </div>
  );
}

export default App;
