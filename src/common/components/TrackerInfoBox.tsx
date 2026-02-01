import React from 'react';

export function TrackerInfoBox() {
    return (
        <div className="info-box">
            <p>
                Open the <strong>Console</strong> to see logs.
            </p>
            <p>
                Notice that changing the <em>User</em> or <em>Theme</em> does
                <strong> NOT</strong> trigger a log.
                <br />
                But adding an item <strong>DOES</strong> trigger a log, and that
                log correctly includes the <em>current</em> User and Theme!
            </p>
        </div>
    );
}
