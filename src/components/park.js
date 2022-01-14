
      
    export function Park (esriConfig, WebMap, MapView, ScaleBar, Legend, Graphic, route, RouteParameters, FeatureSet,
            Locate, Search, FeatureLayer, Editor) {

        esriConfig.apiKey = "AAPK56e894ec66ff44f98ac3628433924bc2SBJbb-PoCB1Ye7prP9hpJB9fFVxlEKCsgFsLtHF69xGcvNKOkYksi_GFZRPB5CnG";
        

  const webmap = new WebMap({
        portalItem: {
          id: "e76d9a481715465b8fa3b923aa38fa1e"
        },
      });


        const view = new MapView({
          map: webmap,
          
          container: "viewMap" // Div element
        });

        const search = new Search({  //Add Search widget
      view: view
    });
    view.ui.add(search, "top-right");

    const editor = new Editor({
        view: view
      });
      // Add widget to the view
      view.ui.add(editor, "top-right");

        const locate = new Locate({
          view: view,
          useHeadingEnabled: false,
          goToOverride: function(view, options) {
            options.target.scale = 1800;
            return view.goTo(options.target);
          }
        });
        view.ui.add(locate, "bottom-right");

      const routeUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";

      view.on("click", function(event){
        if (view.graphics.length === 0) {
        addGraphic("origin", event.mapPoint);
      } else if (view.graphics.length === 1) {
        addGraphic("destination", event.mapPoint);

        getRoute();
      } else {
        view.graphics.removeAll();
        // addGraphic("origin",event.mapPoint);
      }
    });

    function addGraphic(type, point) {
      const graphic = new Graphic({
        symbol: {
          type: "simple-marker",
          color: (type === "origin") ? "white" : "black",
          size: "8px"
        },
        geometry: point
      });
      view.graphics.add(graphic);
    }

    function getRoute() {
      const routeParams = new RouteParameters({
        stops: new FeatureSet({
          features: view.graphics.toArray()
        }),

      });
      route.solve(routeUrl, routeParams)
        .then(function(data) {
          data.routeResults.forEach(function(result) {
            result.route.symbol = {
              type: "simple-line",
              color: [5, 150, 255],
              width: 3
            };
            view.graphics.add(result.route);
          });

        })
    }
return <div id="viewMap"></div>
      };